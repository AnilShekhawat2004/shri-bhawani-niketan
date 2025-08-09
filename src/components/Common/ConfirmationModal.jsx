export default function ConfirmationModal({ modalData }) {
    return(
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="w-11/12 max-w-[350px] rounded-2xl border border-bhawaniRed bg-white shadow-lg p-6">
                <p className="text-2xl font-semibold ">{modalData?.text1}</p>
                <p className="mt-3 mb-5 leading-6 text-bhawaniDark">{modalData?.text2}</p>
                <div className="flex items-center gap-x-4">
                    <button 
                      className="curosr-pointer rounded-md bg-bhawaniYellow py-[8px] px-[20px] font-semibold text-white"
                      onClick={modalData?.btn1Handler}
                    >
                        {modalData?.btn1Text}
                    </button>
                    <button
                       className="curosr-pointer rounded-md bg-gray-200 py-[8px] px-[20px] font-semibold"
                       onClick={modalData?.btn2Handler}
                    >
                        {modalData?.btn2Text}
                    </button>
                </div>
            </div>
        </div>
    )
}