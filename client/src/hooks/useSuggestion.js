import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function useSuggestion() {
  const [suggestion, setSuggestion] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSuggestedUser = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/user/user-suggestion");
      if (data.success) {
        setSuggestion(data.suggestion);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { suggestion, getSuggestedUser, loading };
}
