export default function Ticker() {


    return (
        <div className="stock-ticker-container overflow-hidden w-full relative">
            <div className="stock-ticker flex items-center">
                <div className={`ticker-item  mx-4 flex items-center text-xl`}>
                    <span className="mx-8 text-correctBlue">KARSTEN</span>
                    <span className="mx-8text-correctBlue">PASCAL</span>
                    <span className="mx-8 text-correctBlue">THETTY inc</span>
                    <span className="mx-8 text-correctBlue">GEOFFREY CORP</span>
                    <span className="mx-8 text-correctBlue">STEVE AS</span>
                    <span className="mx-8 text-correctBlue">EDMOND AS</span>
                    <span className="mx-8 text-correctBlue">CLARA AS</span>
                    <span className="mx-8 text-correctBlue">GRACE AS</span>
                    <span className="mx-8 text-correctBlue">CATHRINE AS</span>
                </div>
                {/* Duplicate for seamless scroll */}

                <div className={`ticker-item mx-4 flex items-center text-xl`}>
                    <span className="mx-8 text-correctBlue">KARSTEN</span>
                    <span className="mx-8 text-correctBlue">PASCAL</span>
                    <span className="mx-8 text-correctBlue">THETTY inc</span>
                    <span className="mx-8 text-correctBlue">GEOFFREY CORP</span>
                    <span className="mx-8 text-correctBlue">STEVE AS</span>
                    <span className="mx-8 text-correctBlue">EDMOND AS</span>
                    <span className="mx-8 text-correctBlue">CLARA AS</span>
                    <span className="mx-8 text-correctBlue">GRACE AS</span>
                    <span className="mx-8 text-correctBlue">CATHRINE AS</span>
                </div>
            </div>

            <style jsx>{`
          .stock-ticker-container {
            height: 50px;
          }
          .stock-ticker {
            animation: scroll 40s linear infinite;
            display: flex;
          }
          .ticker-item {
            white-space: nowrap;
          }
          .plus .change {
            color: #089981;
          }
          .minus .change {
            color: #f23645;
          }
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
        </div>
    );
}