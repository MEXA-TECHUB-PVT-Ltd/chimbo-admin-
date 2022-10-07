import * as yup from "yup";
/*eslint-disable*/

export const adminSignUpSchema = yup.object().shape({

	password: yup.string().required("Password Required").min(4).max(18),
	email: yup.string().email().required("Email required"),

	name: yup.string().required("Name Required"),
	acceptedTerms: yup.bool().oneOf([true], "You must accept the terms and conditions").required("You must accept the terms and conditions"),
	phoneNo: yup.number().required("Phone No Required"),
});
export const adminUpdateSchema = yup.object().shape({


	email: yup.string().email().required("Email required"),

	name: yup.string().required("Name Required"),

	phoneNo: yup.number().required("Phone No Required"),
});

export const adminLoginSchema = yup.object().shape({
	password: yup.string().required("Password Required"),
	email: yup.string().email().required("Email required"),
});
export const userChangePasswordEmail = yup.object().shape({

	emailAddress: yup.string().email().required("Email required"),
});
export const userVerifyEmail = yup.object().shape({

	email: yup.string().email().required("Email required"),
});
export const verifyOtp = yup.object().shape({

	otp: yup.number().required("Enter Otp"),
});
export const enternewPassword = yup.object().shape({

	newPassword: yup.string().required("Enter Password"),
});
export const nameType = yup.object().shape({

	name: yup.string().required("Name Required"),
});
export const userChangePassword = yup.object().shape({

	confirmPassword: yup
		.string()
		.required("Confirm Password Required")
		.oneOf([yup.ref("password"), null], "Password must be matched"),
	password: yup.string().required("Password Required").min(4).max(18),
	ID: yup.string().required("ID Required").min(20, "ID must be valid").max(26, "ID must be valid")
});



export const listingForm = yup.object().shape({

	propertyTypeId: yup.string().required("Property Type Required"),
	listingTypeId: yup.string().required("Operation Required"),
	genderPreferenceId: yup.string().required("Gender Required"),
	city: yup.string().required("City Required"),
	streetName: yup.string().required("Street Name Required"),
	streetNo: yup.string().required("Street No Required"),
	price: yup.string().required("Price Required"),
	availableFrom: yup.string().required("Available From Date Required"),
	roomSharedWith: yup.string().required("Flat Share with Required"),
	currentResidentCount: yup.string().required("Number of People Currently living is Required"),
	isOwnerLivingInProperty: yup.string().required("Any One Living in the Property Required"),
	occupationTypeId: yup.array().required("Occupation Required"),
	selectedRoomCharacteristics: yup.array().required("Room Characteristics Required"),
	minStay: yup.string().required("Minimum Stay Required"),
	m2: yup.string().required("M2 of house Required"),
	baths: yup.string().required("No of Baths Required"),
	beds: yup.string().required("No of Beds Required"),
	heatingTypeId: yup.string().required("Heating Type required"),
	selectedFeatures: yup.array().required("Features Required"),
	selectedAccessibilityItems: yup.array().required("Accessibility Item Required"),
	email: yup.string().email().required("Email required"),
	phone: yup.number().required("Phone No Required"),
	yourName: yup.string().required("Name is Required"),
	imagePaths: yup.array().required("Select Images and Video"),

});