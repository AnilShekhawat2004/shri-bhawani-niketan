import ErrorImage from "../assets/College/Error.png"
import MButton from "../components/Common/Buttons/mButton"
import { Link } from 'react-router-dom'

function Error() {
    return(
        <div className="mt-32 mb-20 w-full h-full flex flex-col items-center justify-center">
            <div>
                <img
                    src={ErrorImage}
                    alt='Error'
                    loading='lazy'
                    className=""
                />
            </div>

            <div className="flex flex-col items-center gap-3">
                <p className="text-[40px] font-verdana font-bold text-bhawaniDark">No Data Available</p>
                <div className="w-[80%] bg-bhawaniYellow h-[2px]"></div>
            </div>

            <Link to="/" className="mt-10">
                <MButton className="text-[20px]">
                    {"Go to HomePage"}
                </MButton>
            </Link>
        </div>
    )
}

export default Error