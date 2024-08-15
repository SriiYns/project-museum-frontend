// eslint-disable-next-line no-unused-vars
import React from "react";
import { useTranslation } from "react-i18next";
import { FiPhoneCall, FiMail } from "react-icons/fi"; // Pastikan Anda telah menginstal react-icons
import { FaMapMarkerAlt } from "react-icons/fa"; // Menambahkan ikon lokasi

const ContactPage = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen pt-40 pb-20 space-y-10 w-content">
            <h1 className="text-3xl font-bold text-center">
                {t("contact.title")}
            </h1>

            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start lg:space-x-10">
                <div className="lg:w-1/2 space-y-4">
                    <div className="flex items-center">
                        <FaMapMarkerAlt className="text-2xl" /> {/* Menggunakan ikon lokasi */}
                        <div className="ml-4">
                            <p className="font-bold">{t("Alamat Museum NTB")}</p>
                            <p> Jl. Panji Tilar Negara No.6,<br />
                                Taman Sari, Kec. Ampenan, Kota Mataram, Nusa Tenggara Barat. 83117
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <FiPhoneCall className="text-2xl" />
                        <div className="ml-4">
                            <p className="font-bold">{t("Telephone")}</p>
                            <p>
                                +62 897-3862-445<br />
                                Humas
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <FiMail className="text-2xl" />
                        <div className="ml-4">
                            <p className="font-bold">{t("Email")}</p>
                            <p>
                                museumnegeri@ntbprov.go.id<br />
                                museumntb@gmail.com
                            </p>
                        </div>
                    </div>
                </div>
                <div className="lg:w-1/2 mt-10 lg:mt-0">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.113452362861!2d116.08368191744385!3d-8.585089500000011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dcdc07e50172071%3A0xcd1642ba10970ea8!2sJl.%20Panji%20Tilar%20Negara%20No.13%2C%20Kekalik%20Jaya%2C%20Kec.%20Sekarbela%2C%20Kota%20Mataram%2C%20Nusa%20Tenggara%20Bar.%2083114!5e0!3m2!1sen!2sid!4v1721259089405!5m2!1sen!2sid"
                        width="100%" 
                        height="450" 
                        style={{ border: 0 }} 
                        allowFullScreen={true} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Museum Location"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;