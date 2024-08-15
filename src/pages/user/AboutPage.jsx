import museum from "../../assets/img/museum.jpg";
import { useTranslation } from "react-i18next";

const AboutPage = () => {
    const { t } = useTranslation();

    return (
        <div className="pt-40 pb-20 space-y-10 w-content">
            <h1 className="text-3xl font-bold text-center">
                {t("about.title")}
            </h1>

            <img src={museum} alt="Foto Museum" />

            <div>
                <p className="leading-loose text-justify">
                    {t("about.paragraph1")}
                </p>

                <br />

                <p className="leading-loose text-justify">
                    {t("about.paragraph2")}
                </p>

                <br />

                <p className="leading-loose text-justify font-bold text-lg">
                    {t("about.paragraph3")}
                </p>

                <br />

                <p className="leading-loose text-justify">
                    {t("about.paragraph4")}
                </p>

                <br />

                <p className="leading-loose text-justify font-bold text-lg">
                    {t("about.paragraph5")}
                </p>

                <br />

                <p className="leading-loose text-justify">
                    {t("about.paragraph6")}
                </p>

                <br />

                <p className="leading-loose text-justify font-bold text-lg">
                    {t("about.paragraph7")}
                </p>

                <br />

                <p className="leading-loose text-justify">
                    {t("about.paragraph8")}
                </p>

                <br />

                <p className="leading-loose text-justify font-bold text-lg">
                    {t("about.paragraph9")}
                </p>

                <br />

                <p className="leading-loose text-justify">
                    {t("about.paragraph10")}
                </p>

                <br />

                <p className="leading-loose text-justify font-bold text-lg">
                    {t("about.paragraph11")}
                </p>

                <br />

                <p className="leading-loose text-justify">
                    {t("about.paragraph12")}
                </p>
            </div>
        </div>
    );
};

export default AboutPage;
