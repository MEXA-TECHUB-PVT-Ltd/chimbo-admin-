import axios from "axios";
/*eslint-disable*/
import { useState } from "react";

// const url = "http://localhost:5000/purchaseForm/post";
const API = axios.create({
	baseURL: "http://localhost:3000",
});

const token = JSON.parse(localStorage.getItem("userToken"));

export const submitPurchaseForm = async (purchaseFormData) => {
	try {
		const resp = await API.post(
			"api/purchaseForm/post",
			{
				headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("userToken"))}` },
			},
			purchaseFormData
		);
		alert(resp.data.name);
	} catch (e) {
		alert(e);
	}
};

export const authFormSignup = (authFormData) => API.put("/api/admin/add", authFormData);





export const authFormLogin = (authFormData) => API.post("api/admin/login", authFormData);



export const getPurchaseFormData = (pageSize, reportID, startDate, endDate) =>
	API.get(`api/purchaseForm/get?pageSize=${pageSize}&&reportID=${reportID}&&startDate=${startDate}&&endDate=${endDate}`, {
		headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("userToken"))}` },
	});

export const getUnverifiedUser = async () => {
	try {
		console.log("get user called");
		const resp = await API.get("api/admin/getUnverifiedUser", {
			headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("userToken"))}` },
		});
		return resp.data;
	} catch (e) {
		return e.response.data.message;
	}
};

export const AllowUser = async (uniqueKey, status) => {
	try {
		console.log("allow user called");
		await API.post(`api/admin/allowUser/${uniqueKey}/${status}`, {}, {
			headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("userToken"))}` },
		});
	} catch (e) {
		return e.response;
	}
};
export const VerifyForgotPassword = async (id) => {
	try {
		const resp = await API.post(`api/admin/allowUser/${id}/`);

		return resp.data;
	} catch (e) {
		return e.response;
	}
};
export const forgotPasswordEmailVerify = async (emailAddress) => {
	try {
		const resp = await API.post(`api/forgotPassword/EmailVerify/`, emailAddress);

		return resp.data;
	} catch (e) {
		return e.response.data.message;
	}
};
export const changePassword = async (changePasswordData) => {
	try {
		const resp = await API.post(`api/forgotPassword/changePassword/`, changePasswordData);

		return resp.data;
	} catch (e) {
		return e.response.data.message;
	}
};

export const frontEndAuthAPI = async (token) => {
	try {
		const resp = await API.post(`api/frontEnd/auth/`, token);

		return resp.data;
	} catch (e) {
		return e.response.data.message;
	}
};