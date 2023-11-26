import { Platform } from "react-native";
let BASE_URL = "";

if (Platform.OS === "android") {
     // BASE_URL = "https://soctor-food.onrender.com/api/v1/" 
     BASE_URL = "http://192.168.47.74:3000/api/v1/"
} 

export default BASE_URL;