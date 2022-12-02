import axios from "axios";
/*eslint-disable*/

import BASE_URL from "BASE_URL";

const API = axios.create({

	baseURL: BASE_URL

});
const config = {
	headers: { 'content-type': 'multipart/form-data' }
}
const token = JSON.parse(localStorage.getItem("userToken"));

// export const submitPurchaseForm = async (purchaseFormData) => {
// 	try {
// 		const resp = await API.post(
// 			"api/purchaseForm/post",
// 			{
// 				headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("userToken"))}` },
// 			},
// 			purchaseFormData
// 		);
// 		alert(resp.data.name);
// 	} catch (e) {
// 		alert(e);
// 	}
// };

export const authFormSignup = (authFormData) => API.put("/api/admin/add", authFormData);
export const authFormLogin = (authFormData) => API.post("api/admin/login", authFormData);




export const getAllListings = (pageNo) => API.get(`api/listings/getAll?pageNo=${pageNo}`)
export const getAllPropertyTypes = () => API.get("api/property-types/getAll")
export const getAllAccessibilityItems = () => API.get("api/accessibility-items/getAll")
export const getAllGenders = () => API.get("api/genders/getAll")
export const getGender = () => API.get(`api/genders/get/${id}`)

export const getAllListingFeatures = () => API.get("api/listing-features/getAll")
export const getAllListingType = () => API.get("api/listing-types/getAll")
export const getAllOccupationType = () => API.get("api/occupation-types/getAll")
export const getAllRoomCharacteristics = () => API.get("api/room-characteristics/getAll")
export const getAllSpecifications = () => API.get("api/specificaitons/getAll")
export const getAllUsers = () => API.get("api/user/getAll")
export const getAllHeatingTypes = () => API.get("api/heating-types/getAll")
export const getIDs = () => API.get("api/listings/getIDs")
export const getCount = () => API.get("api/listings/getCount")





export const getHeatingType = (id) => API.get(`api/heating-types/get/${id}`)
export const getRoomCharacteristics = (id) => API.get(`api/room-characteristics/get/${id}`)
export const getPropertyTypes = (id) => API.get(`api/property-types/get/${id}`)
export const getListing = (id) => API.post(`api/listings/get/${id}`)
export const getUser = (id) => API.get(`api/user/get/${id}`)
export const getAdminByID = (id) => API.get(`api/admin/get/${id}`)






export const addHeatingType = (values) => API.put("api/heating-types/add", values)
export const addPropertType = (values) => API.put("api/property-types/add", values)
export const addRoomCharacteristic = (values) => API.put("api/room-characteristics/add", values)
export const addListing = (values) => API.put("api/listings/add", values)
export const uploadAdminProfilePic = (values) => API.put("api/admin/uploadPfp", values, config)







export const deleteHeatingType = (id) => API.delete(`api/heating-types/delete/${id}`)
export const deletePropertyType = (id) => API.delete(`api/property-types/delete/${id}`)
export const deleteRoomCharacteristics = (id) => API.delete(`api/room-characteristics/delete/${id}`)
export const deleteListing = (id) => API.delete(`api/listings/delete/${id}`)




export const BlockUser = (values) => API.patch(`api/user/block`, values);
export const UnBlockUser = (values) => API.patch(`api/user/unblock`, values);
export const updateHeatingType = (values) => API.patch(`api/heating-types/update`, values);
export const updatePropertyType = (values) => API.patch(`api/property-types/update`, values);
export const updateRoomCharacteristic = (values) => API.patch(`api/room-characteristics/update`, values);
export const changePassword = (values) => API.patch(`api/admin/changePassword`, values);
export const updateAdminProfile = (values) => API.patch(`api/admin/update-admin`, values);



export const uploadImagesAndVideos = (values) => API.post(`api/listings/upload-images`, values, config);
export const getByEmail = (data) => API.post(`api/admin/getByEmail/`, data)
export const verifyAdminOtp = (data) => API.post(`api/admin/verifyOtp`, data)
export const getCharData = (value) => API.post("api/listings/charData", value)