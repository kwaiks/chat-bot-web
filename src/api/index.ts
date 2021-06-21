import axios from "axios";

export const getFrequentQuestions = async (): Promise<Array<object>> => {
  try {
    const fq = await axios.get("https://api.kwaiks.me/frequent");
    return fq.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getUnansweredQuestions = async (): Promise<Array<object>> => {
  try {
    const fq = await axios.get("https://api.kwaiks.me/unanswered");
    return fq.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
