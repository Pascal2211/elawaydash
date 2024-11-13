"use client";
import { useState } from "react";
import { db } from "@/firebase/firebase"; // Adjust the path as needed
import { collection, setDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function CompanyModule() {
    const [moduleName, setModuleName] = useState("");
    const [moduleNameError, setModuleNameError] = useState(false);
    const [objectivesTwo, setObjectivesTwo] = useState([]);
    const [currentObjective, setCurrentObjective] = useState({
        objectiveName: "",
        initiatives: [],
    });
    const [objectiveNameError, setObjectiveNameError] = useState(false);
    const [currentInitiative, setCurrentInitiative] = useState({
        initiativeName: "",
        keyResult: "",
        baseline: "",
        current: "",
        target: "",
        comment: "",
        owner: "",
    });
    const [initiativeErrors, setInitiativeErrors] = useState({
        initiativeName: false,
        keyResult: false,
        baseline: false,
        current: false,
        target: false,
        comment: false,
        owner: false,
    });
    
    const [showContent, setShowContent] = useState(false); // State to control visibility

    const router = useRouter();

    // Function to toggle content visibility
    const handleToggleContent = () => {
        setShowContent(!showContent);
    };

    // Function to add a new objective section
    const handleAddObjectiveSection = () => {
        if (!currentObjective.objectiveName.trim()) {
            setObjectiveNameError(true);
            return;
        }
        setObjectivesTwo([...objectivesTwo, currentObjective]);
        setCurrentObjective({
            objectiveName: "",
            initiatives: [],
        });
        setObjectiveNameError(false);
    };

    // Function to add an initiative to the current objective
    const handleAddInitiative = (objectiveIndex) => {
        const fields = ["initiativeName", "keyResult", "baseline", "current", "target", "comment", "owner"];
        let hasError = false;
        const errors = {};

        fields.forEach((field) => {
            if (!currentInitiative[field].trim()) {
                errors[field] = true;
                hasError = true;
            } else {
                errors[field] = false;
            }
        });

        setInitiativeErrors(errors);

        if (hasError) return;

        const updatedObjectives = [...objectivesTwo];
        updatedObjectives[objectiveIndex].initiatives = [
            ...(updatedObjectives[objectiveIndex].initiatives || []),
            currentInitiative,
        ];
        setObjectivesTwo(updatedObjectives);

        // Reset initiative form fields and errors for the next entry
        setCurrentInitiative({
            initiativeName: "",
            keyResult: "",
            baseline: "",
            current: "",
            target: "",
            comment: "",
            owner: "",
        });
        setInitiativeErrors({
            initiativeName: false,
            keyResult: false,
            baseline: false,
            current: false,
            target: false,
            comment: false,
            owner: false,
        });
    };

    // Function to save the module, objectives, and initiatives to Firestore
    const handleSaveModule = async () => {
        if (!moduleName.trim()) {
            setModuleNameError(true);
            return;
        }
        if (objectivesTwo.length === 0) {
            alert("Please add at least one objective.");
            return;
        }

        try {
            await setDoc(doc(db, "objectives", moduleName), {
                moduleName,
                objectivesTwo,
            });
            router.push('/dash');
            setModuleName("");
            setObjectivesTwo([]);
            setModuleNameError(false);
        } catch (error) {
            console.error("Error saving module:", error);
        }
    };

    return (
        <div className="min-h-screen min-w-screen bg-backgroundWhite p-8">
            {/* Button to show/hide content */}
            <button onClick={handleToggleContent} className="text-black bg-blue-500 p-2 rounded-lg">
                Push me
            </button>
            
            {/* Conditionally render content based on showContent state */}
            {showContent && (
                <>
                    <div className="w-2/3 mx-auto h-20 bg-correctBlue rounded-sm flex items-center justify-center mb-4 mt-4">
                        <input
                            className={`bg-correctBlue text-white text-center text-lg rounded-lg p-2 w-2/3 ${moduleNameError ? "border-2 border-red-500" : ""}`}
                            placeholder="MODULE CREATION NAME"
                            value={moduleName}
                            onChange={(e) => {
                                setModuleName(e.target.value);
                                setModuleNameError(false);
                            }}
                        />
                    </div>

                    <div className="flex flex-col items-center mt-8 space-y-6 max-w-4xl mx-auto">
                        {objectivesTwo.map((objectiveThree, objIndex) => (
                            <div key={objIndex} className="w-full space-y-4 mb-6">
                                <div className="bg-objectivBlue text-white w-full p-4 rounded-lg text-center shadow-lg">
                                    <h3 className="text-lg">{objectiveThree.objectiveName}</h3>
                                </div>
                                {objectiveThree.initiatives.map((initiative, initIndex) => (
                                    <div key={initIndex} className="p-4 rounded-lg mt-4">
                                        <div className="text-center text-lg font-semibold bg-textBlue py-2 rounded-md mb-4">
                                            <h4>{initiative.initiativeName}</h4>
                                        </div>
                                        <div className="grid grid-cols-6 gap-4 mt-2">
                                            <div>
                                                <p className="text-black text-lg">Key Result</p>
                                                <div className="bg-objectivBlue text-white p-2 rounded-md text-center">{initiative.keyResult}</div>
                                            </div>
                                            <div>
                                                <p className="text-black text-lg">Baseline</p>
                                                <div className="bg-objectivBlue text-white p-2 rounded-md text-center">{initiative.baseline}</div>
                                            </div>
                                            <div>
                                                <p className="text-black text-lg">Current</p>
                                                <div className="bg-objectivBlue text-white p-2 rounded-md text-center">{initiative.current}</div>
                                            </div>
                                            <div>
                                                <p className="text-black text-lg">Target</p>
                                                <div className="bg-objectivBlue text-white p-2 rounded-md text-center">{initiative.target}</div>
                                            </div>
                                            <div>
                                                <p className="text-black text-lg">Comment</p>
                                                <div className="bg-objectivBlue text-white p-2 rounded-md text-center">{initiative.comment}</div>
                                            </div>
                                            <div>
                                                <p className="text-black text-lg">Owner</p>
                                                <div className="bg-objectivBlue text-white p-2 rounded-md text-center">{initiative.owner}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="p-6 rounded-lg mt-6">
                                    <div className="text-center bg-textBlue py-2 rounded-md mb-4">
                                        <input
                                            className={`bg-textBlue text-white text-lg font-semibold text-center w-full p-2 rounded-md placeholder-white ${initiativeErrors.initiativeName ? "border-2 border-red-500" : ""}`}
                                            placeholder="Initiative Name"
                                            value={currentInitiative.initiativeName}
                                            onChange={(e) =>
                                                setCurrentInitiative({
                                                    ...currentInitiative,
                                                    initiativeName: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="grid grid-cols-6 gap-4 mt-4 text-center text-gray-700">
                                        <span>Key Result</span>
                                        <span>Baseline</span>
                                        <span>Current</span>
                                        <span>Target</span>
                                        <span>Comment</span>
                                        <span>Owner</span>
                                    </div>

                                    <div className="grid grid-cols-6 gap-4 mt-2">
                                        {["keyResult", "baseline", "current", "target", "comment", "owner"].map((field, idx) => (
                                            <input
                                                key={idx}
                                                className={`bg-objectivBlue text-white p-2 rounded-md text-center ${initiativeErrors[field] ? "border-2 border-red-500" : ""}`}
                                                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                                value={currentInitiative[field]}
                                                onChange={(e) =>
                                                    setCurrentInitiative({
                                                        ...currentInitiative,
                                                        [field]: e.target.value,
                                                    })
                                                }
                                            />
                                        ))}
                                    </div>

                                    <button
                                        className="bg-green-500 text-white p-2 rounded-md w-full mt-4"
                                        onClick={() => handleAddInitiative(objIndex)}
                                    >
                                        Add Initiative to {objectiveThree.objectiveName}
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="bg-objectivBlue text-white w-full p-4 rounded-lg shadow-lg text-center">
                            <input
                                className={`bg-objectivBlue text-white text-center font-semibold rounded-lg p-2 w-2/3 ${objectiveNameError ? "border-2 border-red-500" : ""}`}
                                placeholder="Objective Name"
                                value={currentObjective.objectiveName}
                                onChange={(e) => {
                                    setCurrentObjective({ ...currentObjective, objectiveName: e.target.value });
                                    setObjectiveNameError(false);
                                }}
                            />
                        </div>
                        <button
                            className="bg-coolBlue text-white p-2 rounded w-2/3 mt-4"
                            onClick={handleAddObjectiveSection}
                        >
                            Create Objective
                        </button>

                        <button
                            className="bg-coolBlue text-white p-2 rounded w-2/3 mt-4"
                            onClick={handleSaveModule}
                        >
                            Save Module
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}