export default function ConfirmationModal({ modalData }) {
    return(
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center bg-black/40 backdrop-blur-sm">
            <div className="w-11/12 max-w-[380px] rounded-2xl border border-bhawaniRed bg-white shadow-2xl p-6 animate-fadeIn">
                <p className="text-xl font-semibold text-gray-900 ">{modalData?.text1}</p>
                <p className="mt-3 mb-6 text-sm text-bhawaniDark leading-relaxed">{modalData?.text2}</p>
                <div className="flex items-center justify-end gap-3">
                    <button 
                      className="rounded-xl border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
                      onClick={modalData?.btn1Handler}
                    >
                        {modalData?.btn1Text}
                    </button>
                    <button
                       className="rounded-xl bg-bhawaniYellow px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-yellow-500 active:scale-95"
                       onClick={modalData?.btn2Handler}
                    >
                        {modalData?.btn2Text}
                    </button>
                </div>
            </div>
        </div>
    )
}