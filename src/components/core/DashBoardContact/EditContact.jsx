import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  editContactUs,
  getContactDetails,
} from "../../../services/operations/contactUs";
import { setContact, setEditContact } from "../../../slices/contactSlice";
import LoaderOverlay from "../../Common/LoaderOverlay"


function EditContact() {
  const { register, handleSubmit, setValue, getValues } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { contact, editContact } = useSelector((state) => state.contact);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const contactId = queryParams.get("id");

  useEffect(() => {
    if (!contactId) return;

    (async () => {
      setLoading(true);
      const result = await getContactDetails(contactId, token);
      if (result) {
        dispatch(setEditContact(true));
        dispatch(setContact(result));
      }
      setLoading(false);
    })();
  }, [contactId, token, dispatch]);

  useEffect(() => {
    if (editContact && contact) {
      setValue("status", contact.status);
    }
  }, [editContact, contact, setValue]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (currentValues.status !== contact.status) {
      return true;
    }
    return false;
  };

  const onSubmit = async (data) => {
    if (editContact) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();
        formData.append("contactId", contact._id);
        if (currentValues.status !== contact.status) {
          formData.append("status", data.status);
        }

        setLoading(true);
        const result = await editContactUs(formData, token);
        setLoading(false);
        if (result) {
          dispatch(setContact(result));
          dispatch(setEditContact(false));
          navigate(`/dashboard/contact`);
        } else {
          toast.error("No changes made to the form");
        }
        return;
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 grid grid-cols-1"
    >
      <div className="relative">
        <p className="text-sm font-medium text-gray-700 mb-1">
          Status <span className="text-red-500">*</span>
        </p>

        <div className="flex gap-10 ml-3">
          {/* Pending */}
          <label className="relative flex gap-4 items-center px-4 py-2 rounded-xl cursor-pointer select-none">
            {/* Radio first in DOM so peer-checked works */}
            <input
              type="radio"
              value="Pending"
              defaultChecked
              {...register("status")}
              className="peer order-2 z-10 accent-bhawaniYellow"
            />
            {/* Text (left) */}
            <span className="order-1 z-10 font-medium peer-checked:text-white text-bhawaniRed">
              Pending
            </span>
            {/* Bg / border layer */}
            <span className="absolute inset-0 rounded-xl border border-bhawaniRed bg-white transition-colors duration-200 peer-checked:bg-bhawaniRed" />
          </label>

          {/* Resolved */}
          <label className="relative flex items-center gap-4 px-4 py-2 rounded-xl cursor-pointer select-none">
            <input
              type="radio"
              value="Resolved"
              {...register("status")}
              className="peer order-2 z-10 accent-bhawaniYellow"
            />
            <span className="order-1 z-10 font-medium peer-checked:text-white text-bhawaniRed">
              Resolved
            </span>
            <span className="absolute inset-0 rounded-xl border border-bhawaniRed bg-white transition-colors duration-200 peer-checked:bg-bhawaniRed" />
          </label>
        </div>
      </div>

      <div className="relative flex justify-between">
        <button
          type="button"
          onClick={() => {
            navigate("/dashboard/contact", { state: { refresh: true } });
            setTimeout(() => {
              dispatch(setContact(null));
              dispatch(setEditContact(false));
            }, 100);
          }}
          className="pl-6 pr-6 pt-3 pb-3 shadow-lg rounded-lg bg-gray-300 hover:bg-gray-400 font-m2 transition-all duration-500 "
        >
          Cancel
        </button>

        <button
          disabled={loading}
          className="pl-6 pr-6 pt-3 pb-3 rounded-xl shadow-lg text-bhawaniDark bg-bhawaniYellow"
        >
          {!editContact ? "Save" : "Save Changes"}
        </button>
      </div>
      {loading > 0 && <LoaderOverlay/>}
    </form>
  );
}

export default EditContact;
