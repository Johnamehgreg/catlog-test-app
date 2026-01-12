import { initialValues, validationSchemas } from "@core/validators";
import { useFormik } from "formik";
import { useState } from "react";
import { useLoginMutation } from "../mutate/use-login-mutation";


const tabList = [
    { value: 'Email', label: 'Email Address' },
    { value: 'Phone', label: 'Phone Number' },
]

export const useLogin = () => {
    const [activeTab, setActiveTab] = useState(tabList[0].value)
    const { mutate, isPending } = useLoginMutation()

    const formik = useFormik({
        initialValues: {
            ...initialValues.login,
            loginType: activeTab,
        },
        validationSchema: validationSchemas.login,
        enableReinitialize: true,
        onSubmit: values => {
            const submitData: any = { password: values.password };
            if (activeTab === 'Email') {
                submitData.email = values.email?.toLowerCase();
            } else {
                submitData.phone = values.phone;
            }
            mutate(submitData);
        },
    });

    // Update loginType when tab changes
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        formik.setFieldValue('loginType', tab);
        // Clear the other field when switching tabs
        if (tab === 'Email') {
            formik.setFieldValue('phone', '');
            formik.setFieldTouched('phone', false);
        } else {
            formik.setFieldValue('email', '');
            formik.setFieldTouched('email', false);
        }
    };



    return {
        handleTabChange,
        formik,
        isPending,
        tabList,
        activeTab
    }
}