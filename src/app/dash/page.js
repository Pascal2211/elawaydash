"use client"

import { auth, db } from '@/firebase/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getDocs, collection, setDoc, updateDoc, deleteField } from 'firebase/firestore';
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import navbar from '../components/navbar';

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [selectedObjective, setSelectedObjective] = useState(null);

  const [loading, setLoading] = useState(true);
  const [showSingleValueInput, setShowSingleValueInput] = useState(false); // To show single value input field
  const [isCreatingObjective, setIsCreatingObjective] = useState(false);
  const [isCreatingRow, setIsCreatingRow] = useState(false); // New state for creating a row
  const [superAdmin, setSuperAdmin] = useState(false);
  const [showOverlayButtons, setShowOverlayButtons] = useState(false);
  const [isCreatingSingleValue, setIsCreatingSingleValue] = useState(false);


  const [newObjectiveName, setNewObjectiveName] = useState('');
  const [newSingleValue, setNewSingleValue] = useState(''); // For single value input
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newSingleValueKey, setNewSingleValueKey] = useState(''); // For single value key

  const [objectives, setObjectives] = useState([]);
  const [singleValues, setSingleValues] = useState([]);
  const [newRows, setNewRows] = useState([]);
  const [addingKey, setAddingKey] = useState({});
  const [collapsedObjectives, setCollapsedObjectives] = useState({});
  const [deleteMode, setDeleteMode] = useState({});

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
  const auth = getAuth();

  const handleToggleOverlayButtons = () => {
    setShowOverlayButtons(!showOverlayButtons);
  }
  const handleToggleCreate = () => {
    if (!superAdmin) {
      notifyNoAccess();
      return;
    }
    setIsCreatingSingleValue(!isCreatingSingleValue); //her pascal
    setShowOverlayButtons(false)
  };

  // Function to toggle content visibility
  const handleToggleContent = () => {
    setShowContent(!showContent);
  };

  // Toggle visibility of row creation form
  const handleToggleCreateRow = () => {
    setIsCreatingRow(!isCreatingRow);
    setShowOverlayButtons(false);
  };

  const handleBack = () => {
    setShowOverlayButtons(false);
  }

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

  // Function to save the row module to Firestore
  const handleCreateRow = async () => {
    if (newRows.length === 0) {
      alert("Please add at least one row.");
      return;
    }

    try {
      await setDoc(doc(db, "objectives", "Company Rows"), { // Change "Company Rows" to a unique ID or dynamic ID if necessary
        module: "rows",
        rows: newRows,
      });
      setNewRows([]);
      setIsCreatingRow(false); // Close the row creation form after saving
    } catch (error) {
      console.error("Error saving row module:", error);
    }
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
        module: "objective",
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

  const notifyNoAccess = () => alert("You do not have pemission to do anything")

  const handleToggleDeleteMode = (objectiveId) => {
    if (!superAdmin) {
      notifyNoAccess();
      return;
    }
    setDeleteMode((prevState) => ({
      ...prevState,
      [objectiveId]: !prevState[objectiveId],
    }))
  };

  const handleDeleteKeyValue = async (objectiveId, keyToDelete) => {

    try {
      const objectiveRef = doc(db, "objectives", objectiveId);

      // Ensure firebase.firestore.FieldValue.delete() is used correctly
      await updateDoc(objectiveRef, {
        [keyToDelete]: deleteField(),
      });

      // Update local state by filtering out the deleted key
      setObjectives((prevObjectives) =>
        prevObjectives.map((objective) =>
          objective.id === objectiveId
            ? {
              ...objective,
              [keyToDelete]: undefined, // Remove the key from the objective
            }
            : objective
        )
      );
    } catch (error) {
      console.error("Error deleting key-value pair:", error);
    }
  };

  // Function to add a new row to the objective being created
  const handleAddRow = (keyName = 'values') => {
    setNewRows([...newRows, { title: '', [keyName]: [] }]);
  };

  // Function to update the title of a row
  const handleRowTitleChange = (index, title) => {
    const updatedRows = [...newRows];
    updatedRows[index].title = title;
    setNewRows(updatedRows);
  };

  // Function to add a new value input to a specific row
  const handleAddValueToRow = (index) => {
    const updatedRows = [...newRows];
    if (!updatedRows[index].values) {
      updatedRows[index].values = []; // Ensure values array is initialized
    }
    updatedRows[index].values.push(''); // Add an empty string to represent a new value
    setNewRows(updatedRows);
  };

  // Function to update a specific value in a row
  const handleRowValueChange = (rowIndex, valueIndex, value) => {
    const updatedRows = [...newRows];
    updatedRows[rowIndex].values[valueIndex] = value; // Update the specific value in the row
    setNewRows(updatedRows);
  };

  const handleToggleAddKey = (objectiveId) => {
    if (!superAdmin) {
      notifyNoAccess();
      return;
    }
    setAddingKey((prevState) => ({
      ...prevState,
      [objectiveId]: !prevState[objectiveId],
    }));
  };

  const handleObjectiveClick = (id) => {
    setSelectedObjective(id);
  };

  const handleSaveSingleValue = async () => {
    if (!newObjectiveName.trim() || singleValues.length === 0) {
      alert("Please provide a name for the objective and add at least one value.");
      return;
    }

    // Prepare data to be saved to Firestore
    const valuesObject = singleValues.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});

    const newObjective = {
      module: "single",
      name: newObjectiveName,
      values: valuesObject, // All single values combined in one object
    };

    try {
      await setDoc(doc(db, "objectives", newObjectiveName), newObjective);

      // Reset fields after saving
      setNewObjectiveName("");
      setSingleValues([]);
      setIsCreatingSingleValue(false);
      alert("Objective saved successfully!");
    } catch (error) {
      console.error("Error saving objective:", error);
      alert("An error occurred while saving the objective.");
    }
  };

  const handleAddSingleValue = () => {
    if (newSingleValueKey.trim() && newSingleValue.trim()) {
      // Add the new key-value pair to the objectives array
      setSingleValues((prevObjectives) => [
        ...prevObjectives,
        { key: newSingleValueKey, value: newSingleValue }
      ]);

      // Clear the input fields after adding the value
      setNewSingleValueKey("");
      setNewSingleValue("");
    } else {
      alert("Please provide both a field name and a value.");
    }
  };


  const handleCreateObjective = async () => {
    if (!newObjectiveName.trim()) {
      alert("Please enter a name for the new objective");
      return;
    }

    const newObjective = {
      module: "single",
      rows: newRows,
      ...(newSingleValueKey && newSingleValue && { [newSingleValueKey]: newSingleValue }), // Add single value if it exists
    };

    try {
      const objectiveRef = doc(db, "objectives", newObjectiveName);
      await setDoc(objectiveRef, newObjective);

      console.log("Document written with ID: ", docRef.id);
      setObjectives([...objectives, { id: newObjectiveName, ...newObjective }]);
      setNewObjectiveName('');
      setNewRows([]);
      setNewSingleValue('');
      setNewSingleValueKey('');
      setShowSingleValueInput(false);
      setIsCreatingSingleValue(false); //here
    } catch (error) {
      console.error("Error adding a document: ", error);
    }
  };

  // Toggle the single value input field
  const handleToggleSingleValueInput = () => {
    setShowSingleValueInput(!showSingleValueInput);
  };

  const handleAddKeyValue = async (objectiveId) => {
    if (!superAdmin) {
      notifyNoAccess();
      return;
    }

    if (!newKey || !newValue) {
      alert('Please provide a key and its value');
      return;
    }

    try {
      const objectiveRef = doc(db, "objectives", objectiveId);
      await updateDoc(objectiveRef, {
        [newKey]: newValue
      });

      const updatedObjectives = objectives.map((objective) => {
        if (objective.id === objectiveId) {
          return { ...objective, [newKey]: newValue };
        }
        return objective;
      });
      setObjectives(updatedObjectives);
      setNewKey('');
      setNewValue('');
      setAddingKey({ ...addingKey, [objectiveId]: false });
    } catch (error) {
      console.error("Error updating ");
      alert("An error occurred.");
    }
  };


  const handleCollapseToggle = (id) => {
    setCollapsedObjectives((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userInfo = userSnap.data();

          if (!userInfo.adminRights) {
            router.push('/notAuthorized')
            return;
          }

          setSuperAdmin(userInfo.superAdmin === true);

          setUserData({
            email: user.email,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
          });
        }

        const objectivesRef = collection(db, "objectives");
        const objectivesSnap = await getDocs(objectivesRef);

        const objectivesList = objectivesSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setObjectives(objectivesList);

        const initialCollapsedState = {};
        objectivesList.forEach((objective) => {
          initialCollapsedState[objective.id] = true;
        });
        setCollapsedObjectives(initialCollapsedState);

        setLoading(false);
      } else {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [auth, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const moveHome = () => { router.push('/') }
  const moveTeam = () => { router.push('/') }
  const moveTask = () => { router.push('/') }
  const moveSettings = () => { router.push('/') }
  const moveToProfile = () => { router.push('/') }

  return (
    <div className="h-screen w-screen bg-backgroundWhite">
      <div className="grid grid-cols-[auto,1fr] gap-6 p-8 h-full">
        <div className="flex flex-col space-y-6">
          <div className="bg-kindaBlue flex items-center justify-center h-20 w-96 rounded-lg p-4">
            {userData ? (
              <button className="text-specialWhite text-2xl">{userData.firstName}</button>
            ) : (
              <p>Ingenting å vise</p>
            )}
          </div>

          {/**Sidebar of contents containg the objectices  */}
          <div className="bg-correctBlue flex flex-col items-center space-y-6 h-auto w-96 px-5 py-8 rounded-lg max-h-[400px] overflow-y-scroll scrollbar-hide">
            {objectives.length > 0 ? (
              objectives.map((objective) => (
                <h1 key={objective.id} className="text-specialWhite h-12 w-full rounded-sm text-lg">{objective.id}</h1>
              ))
            ) : (
              <p>No objectives found.</p>
            )}

            <button className="bg-specialWhite text-correctBlue text-lg h-12 w-full rounded-sm" onClick={handleToggleOverlayButtons}>
              <p>Create</p>
            </button>
          </div>

          {/* Sidebar */}
          <div className="bg-correctBlue flex flex-col items-center space-y-6 h-auto w-96 px-5 py-8 rounded-lg">
            <button className="text-specialWhite text-lg h-12 w-full" onClick={moveHome}>Oversikt</button>
            <button className="text-specialWhite text-lg h-12 w-full" onClick={moveTeam}>Team</button>
            <button className="text-specialWhite text-lg h-12 w-full" onClick={moveTask}>Oppgaver</button>
            <button className="text-specialWhite text-lg h-12 w-full" onClick={moveSettings}>Innstillinger </button>
          </div>

        </div>

        <div className="bg-specialWhite p-8 rounded-lg shadow-lg pt-10 mb-6 min-h-[150px] h-auto overflow-y-auto">
          {/* Conditionally render content based on showContent state */}
          {showContent && (
            <>
              <div className="w-full mx-auto h-20 bg-correctBlue rounded-sm flex items-center justify-center mb-4 mt-4">
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
          {/* Form for creating a single value */}
          {isCreatingSingleValue && (
            <div className="mb-6">
              {/* Module Name (Objective Name) Input */}
              <input
                type="text"
                value={newObjectiveName}
                onChange={(e) => setNewObjectiveName(e.target.value)}
                placeholder="Enter module name"
                className="border border-gray-300 p-2 w-full rounded text-correctBlue mb-4"
              />

              {/* Field Name Input */}
              <input
                type="text"
                value={newSingleValueKey}
                onChange={(e) => setNewSingleValueKey(e.target.value)}
                placeholder="Field name"
                className="border border-coolBlue p-2 w-full rounded text-correctBlue mb-4"
              />

              {/* Field Value Input */}
              <input
                type="text"
                value={newSingleValue}
                onChange={(e) => setNewSingleValue(e.target.value)}
                placeholder="Value"
                className="border border-coolBlue p-2 w-full rounded text-correctBlue mb-4"
              />

              {/* Button to Add Single Value */}
              <button
                onClick={handleAddSingleValue}
                className="bg-coolBlue text-specialWhite h-10 w-full rounded-sm mb-4"
              >
                Add Row
              </button>

              {/* Display List of Added Values */}
              {singleValues.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-correctBlue mb-2">Added Values</h3>
                  <ul>
                    {singleValues.map((item, index) => (
                      <li key={index} className="flex justify-between items-center mb-2 p-2 bg-textBlue rounded-md">
                        <span className="text-specialWhite font-medium">{item.key}</span>
                        <span className="text-specialWhite">{item.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Confirm Module Button */}
              <button
                onClick={handleSaveSingleValue}
                className="bg-correctBlue text-specialWhite h-12 w-full rounded-sm mt-4"
              >
                Confirm Objective
              </button>
            </div>
          )}

          {isCreatingRow && (
            <div className="mb-6">
              {newRows.map((row, rowIndex) => (
                <div key={rowIndex} className="border border-correctBlue p-4 mt-4 rounded-lg">
                  <input
                    type="text"
                    value={row.title}
                    onChange={(e) => handleRowTitleChange(rowIndex, e.target.value)}
                    placeholder="Row title"
                    className="border border-correctBlue p-2 w-full rounded text-correctBlue mb-2" />

                  {(row.values || []).map((value, valueIndex) => (
                    <input
                      key={valueIndex}
                      type="text"
                      value={value}
                      onChange={(e) => handleRowValueChange(rowIndex, valueIndex, e.target.value)}
                      placeholder={`Value ${valueIndex + 1}`}
                      className="border border-correctBlue p-2 w-full rounded text-correctBlue mb-2"
                    />
                  ))}

                  <button onClick={() => handleAddValueToRow(rowIndex)} className="bg-correctBlue text-specialWhite h-10 w-full rounded-sm mt-2">
                    Add value to row
                  </button>
                </div>
              ))}

              <div className="flex space-x-4 mt-4">
                <button onClick={handleAddRow} className="bg-correctBlue text-white h-10 w-full rounded-sm">
                  Add Row
                </button>
                <button onClick={() => handleAddRow('explanations')} className="bg-correctBlue text-white h-10 w-full rounded-sm">
                  Add Explanations Row
                </button>
              </div>

              <button onClick={handleCreateRow} className="bg-correctBlue text-white h-12 w-full rounded-sm mt-4">
                Confirm Row Module
              </button>
            </div>
          )}

          {/* Overlay with the 3 action buttons */}
          {showOverlayButtons && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
              <div className="text-center">
                <div className='p-5'>
                  <button
                    className="bg-correctBlue text-backgroundWhite text-lg h-12 w-48 rounded-sm"
                    onClick={handleToggleCreate}
                  >
                    Create a module
                  </button>
                </div>

                <div className='p-5'>
                  <button
                    className="bg-correctBlue text-backgroundWhite text-lg h-12 w-48 rounded-sm"
                    onClick={handleToggleContent}
                  >
                    Create an objective
                  </button>
                </div>
                <div className='p-5'>
                  <button
                    className="bg-correctBlue text-backgroundWhite text-lg h-12 w-48 rounded-sm"
                    onClick={handleToggleCreateRow}
                  >
                    Create a row
                  </button>
                </div>
                <div className='p-5'>
                  <button
                    className='text-lg'
                    onClick={handleBack}
                  >x</button>
                </div>
              </div>
            </div>
          )}


          {/* Display Objectives and their fields */}
          {objectives.length > 0 ? (
            objectives.map((objective) => {
              // Check the module type
              const moduleType = objective.module;

              return (
                <div key={objective.id} className="bg-specialWhite p-8 rounded-lg shadow-lg mb-6">
                  {/* Objective Header with Collapse Toggle */}
                  <div className="w-full h-20 bg-correctBlue rounded-sm flex items-center justify-center mb-4">
                    <button onClick={() => handleCollapseToggle(objective.id)} className="bg-specialWhite text-correctBlue h-8 w-8">
                      {collapsedObjectives[objective.id] ? "+" : "-"}
                    </button>
                    <h1 className="text-white text-center text-lg p-4">{objective.id}</h1>
                  </div>

                  {/* Expanded View for Each Module Type */}
                  {!collapsedObjectives[objective.id] && (
                    <>
                      {/* Render Based on Module Type */}
                      {moduleType === "objective" && objective.objectivesTwo ? (
                        // Render Objective Type
                        <div>
                          {objective.objectivesTwo.map((obj, objIndex) => (
                            <div key={objIndex} className="mb-4">
                              <h2 className="text-lg font-bold text-correctBlue">{obj.objectiveName}</h2>
                              {obj.initiatives.map((initiative, initIndex) => (
                                <div key={initIndex} className="p-4 rounded-lg bg-textBlue mt-2 text-white">
                                  <p>Initiative Name: {initiative.initiativeName}</p>
                                  <p>Key Result: {initiative.keyResult}</p>
                                  <p>Baseline: {initiative.baseline}</p>
                                  <p>Current: {initiative.current}</p>
                                  <p>Target: {initiative.target}</p>
                                  <p>Comment: {initiative.comment}</p>
                                  <p>Owner: {initiative.owner}</p>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      ) : moduleType === "rows" && objective.rows ? (
                        // Render Rows Type
                        <div className="space-y-4">
                          {objective.rows.length >= 2 && (
                            <div className="bg-textBlue p-4 rounded-lg">
                              <div className="flex justify-between items-center bg-white p-2 rounded text-center font-bold mb-4">
                                <span className="w-1/2 text-correctBlue">VALUE</span>
                                <span className="w-1/2 text-correctBlue">EXPLANATION</span>
                              </div>
                              <div className="space-y-2">
                                {(objective.rows[0]?.values ?? []).map((value, index) => (
                                  <div key={index} className="flex justify-between bg-white p-2 rounded-lg items-center">
                                    <span className="w-1/2 font-medium text-correctBlue text-center">{value}</span>
                                    <span className="w-1/2 text-correctBlue text-center">
                                      {objective.rows[1]?.values?.[index] ?? ''}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : moduleType === "single" && objective.values ? (
                        // Render Single Type with Key-Value Pairs
                        <div className="text-white rounded-lg">
                          <div className="space-y-2">
                            {Object.entries(objective.values).map(([key, value], index) => (
                              <div key={index} className="flex justify-between bg-textBlue p-2 rounded-lg items-center">
                                <span className="font-medium text-specialWhite">{key}</span>
                                <span className="text-specialWhite">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p>Unknown module type.</p>
                      )}

                      {/* Display additional key-value pairs if needed */}
                      {Object.entries(objective).map(([key, value]) =>
                        key !== "id" && key !== "rows" && key !== "objectivesTwo" && key !== "module" && key !== "values" && (
                          <div key={key} className="bg-textBlue p-4 mb-4 rounded-lg border border-gray-300 flex items-center justify-between">
                            <strong className="text-black">{key}:</strong>
                            <span className="text-black ml-2">{value}</span>
                          </div>
                        )
                      )}
                    </>
                  )}

                </div>
              );
            })
          ) : (
            <p>No objectives found.</p>
          )}

          <div className="flex flex-col items-center">
            <button className="bg-correctBlue text-specialWhite text-lg h-14 rounded-sm w-auto" onClick={handleToggleCreate}><p className="p-4">Create a module</p></button>
          </div>
        </div>
      </div>
    </div>
  );
}