import axios from "axios";

export const fetchFilter = async (filter) => {
    const res = await axios.get(
        "https://wiblebiz.kia.com/mop/bo/api/faq/category",
        {
            params: { tab: filter },
        }
    );
    return res.data;
};

export async function fetchList(tabId, faqCategoryID, question) {
    const params = { tab: tabId };

    if (faqCategoryID && faqCategoryID !== "ALL") {
        params.faqCategoryID = faqCategoryID;
    }

    if (question) {
        params.question = question;
    }

    const res = await axios.get("https://wiblebiz.kia.com/mop/bo/api/faq", {
        params,
    });

    return res.data;
}
