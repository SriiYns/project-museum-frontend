import { useTranslation } from "react-i18next";

const KunjunganPage = () => {
    const { t } = useTranslation();

    const paragraph1 = t("visit.paragraph1");
    const paragraph2 = t("visit.paragraph2");
    const paragraph3 = t("visit.paragraph3");
    const paragraph4 = t("visit.paragraph4");
    const paragraph5 = t("visit.paragraph5");
    const paragraph6 = t("visit.paragraph6");
    const paragraph7 = t("visit.paragraph7");
    const paragraph8 = t("visit.paragraph8");
    const paragraph9 = t("visit.paragraph9");
    const paragraph10 = t("visit.paragraph10");
    const paragraph11 = t("visit.paragraph11");

    return (
        <div className="min-h-screen pt-40 pb-20 space-y-10 w-content">
            <div>
                <h1 className="pb-10 text-3xl font-bold text-center">
                    {t("visit.title")}
                </h1>

                <br />

                <p
                    className="leading-relaxed text-justify font-bold"
                    dangerouslySetInnerHTML={{ __html: paragraph1 }}
                />

                <br />

                <p
                    className="leading-relaxed text-justify"
                    dangerouslySetInnerHTML={{ __html: paragraph2 }}
                />

                <br />

                <p
                    className="leading-relaxed text-justify"
                    dangerouslySetInnerHTML={{ __html: paragraph3 }}
                />

                <br />

                <p
                    className="leading-relaxed text-justify font-bold"
                    dangerouslySetInnerHTML={{ __html: paragraph4 }}
                />

                <br />

                <p
                    className="leading-relaxed text-justify font-bold"
                    dangerouslySetInnerHTML={{ __html: paragraph5 }}
                />

                <br />

                <p
                    className="leading-relaxed text-justify"
                    dangerouslySetInnerHTML={{ __html: paragraph6 }}
                />

                <br />

                <p
                    className="leading-relaxed text-justify"
                    dangerouslySetInnerHTML={{ __html: paragraph7 }}
                />

                <br />

                <p
                    className="leading-relaxed text-justify"
                    dangerouslySetInnerHTML={{ __html: paragraph8 }}
                />

                <br />

                <p
                    className="leading-relaxed text-justify font-bold"
                    dangerouslySetInnerHTML={{ __html: paragraph9 }}
                />

                <br />

                <p
                    className="leading-relaxed text-justify"
                    dangerouslySetInnerHTML={{ __html: paragraph10 }}
                />

                <br />

                <p
                    className="leading-relaxed text-justify"
                    dangerouslySetInnerHTML={{ __html: paragraph11 }}
                />

                <br />
            </div>
        </div>
    );
};

export default KunjunganPage;
