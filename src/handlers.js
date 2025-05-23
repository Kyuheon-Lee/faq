import { http, HttpResponse } from "msw";
import { CONSULT_CATEGORIES, MOCK_FAQS, USAGE_CATEGORIES } from "./constants";

export const handlers = [
    http.get(
        "https://wiblebiz.kia.com/mop/bo/api/faq/category",
        ({ request }) => {
            const url = new URL(request.url);
            const tab = url.searchParams.get("tab");
            return HttpResponse.json(
                tab === "consult" ? CONSULT_CATEGORIES : USAGE_CATEGORIES
            );
        }
    ),

    http.get("https://wiblebiz.kia.com/mop/bo/api/faq", ({ request }) => {
        const url = new URL(request.url);
        const tab = url.searchParams.get("tab");
        const filterId = url.searchParams.get("faqCategoryID");
        const query = url.searchParams.get("question");

        let faqs = MOCK_FAQS[tab] || [];

        if (filterId && filterId !== "ALL") {
            const categories =
                tab === "consult" ? CONSULT_CATEGORIES : USAGE_CATEGORIES;
            const filterName = categories.find(
                (category) => category.categoryID === filterId
            )?.name;

            if (filterName) {
                faqs = faqs.filter(
                    (faq) =>
                        faq.categoryName === filterName ||
                        faq.subCategoryName === filterName
                );
            }
        }

        if (query) {
            faqs = faqs.filter(
                (faq) =>
                    faq.question.includes(query) || faq.answer.includes(query)
            );
        }

        return HttpResponse.json(faqs);
    }),
];
