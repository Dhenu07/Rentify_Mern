import React,{useEffect,useState} from 'react'
import axios from 'axios';
import '../Styles/Stocks.css'
import { FiUploadCloud } from 'react-icons/fi';
import { RiArrowDropDownLine } from "react-icons/ri";
const categoriesData = {
    "Ariyalur": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+'],
    "Chengalpattu": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+'],
    "Chennai": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+'],
    "Coimbatore": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+'],
    "Cuddalore": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+'],
    "Dharmapuri": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+'],
    "Dindigul": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+'],
    "Erode": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+'],
    "Kallakurichi": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+'],
    "Kanchipuram": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+'],
    "Kanyakumari": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+'],
    "Karur": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+'],
    "Krishnagiri": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+'],
    "Madurai": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+'],
    "Nagapattinam": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+'],
    "Namakkal": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+'],
    "Nilgiris": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+'],
    "Perambalur": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+'],
    "Pudukkottai": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+'],
    "Ramanathapuram": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+'],
    "Ranipet": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+'],
    "Salem": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+'],
    "Sivagangai": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+'],
    "Tenkasi": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+'],
    "Thanjavur": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+'],
    "Theni": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+'],
    "Thoothukudi": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+'],
    "Tiruchirappalli": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+'],
    "Tirunelveli": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+'],
    "Tirupattur": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+'],
    "Tiruppur": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+'],
    "Tiruvallur": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+'],
    "Tiruvannamalai": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+'],
    "Tiruvarur": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+'],
    "Vellore": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+'],
    "Viluppuram": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+'],
    "Virudhunagar": ['1BH', '2BH', '3BH', '4BH', '5BH', '5BH+']
};

const priceData = {
    "Ariyalur": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000'],
    "Chengalpattu": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000'],
    "Chennai": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000'],
    "Coimbatore": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000'],
    "Cuddalore": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000'],
    "Dharmapuri": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000'],
    "Dindigul": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000'],
    "Erode": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000'],
    "Kallakurichi": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000'],
    "Kanchipuram": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000'],
    "Kanyakumari": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000'],
    "Karur": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000'],
    "Krishnagiri": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000'],
    "Madurai": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000'],
    "Nagapattinam": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000'],
    "Namakkal": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000'],
    "Nilgiris": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000'],
    "Perambalur": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000'],
    "Pudukkottai": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000'],
    "Ramanathapuram": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000'],
    "Ranipet": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000'],
    "Salem": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000'],
    "Sivagangai": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000'],
    "Tenkasi": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000'],
    "Thanjavur": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000'],
    "Theni": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000'],
    "Thoothukudi": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000'],
    "Tiruchirappalli": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000'],
    "Tirunelveli": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000'],
    "Tirupattur": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000'],
    "Tiruppur": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000'],
    "Tiruvallur": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000'],
    "Tiruvannamalai": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000'],
    "Tiruvarur": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000'],
    "Vellore": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000'],
    "Viluppuram": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000'],
    "Virudhunagar": ['0-1000', '1000-2500', '2500-4000', '4000-6000', '6000-10000', '10000-20000']
};

const availableData = {
    "Ariyalur": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members'],
    "Chengalpattu": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members'],
    "Chennai": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members'],
    "Coimbatore": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members'],
    "Cuddalore": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members'],
    "Dharmapuri": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members'],
    "Dindigul": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members'],
    "Erode": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members'],
    "Kallakurichi": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members'],
    "Kanchipuram": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members'],
    "Kanyakumari": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members'],
    "Karur": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members'],
    "Krishnagiri": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members'],
    "Madurai": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members'],
    "Nagapattinam": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members'],
    "Namakkal": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members'],
    "Nilgiris": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members'],
    "Perambalur": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members'],
    "Pudukkottai": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members'],
    "Ramanathapuram": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members'],
    "Ranipet": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members'],
    "Salem": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members'],
    "Sivagangai": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members'],
    "Tenkasi": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members'],
    "Thanjavur": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members'],
    "Theni": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members'],
    "Thoothukudi": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members'],
    "Tiruchirappalli": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members'],
    "Tirunelveli": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members'],
    "Tirupattur": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members'],
    "Tiruppur": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members'],
    "Tiruvallur": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members'],
    "Tiruvannamalai": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members'],
    "Tiruvarur": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members'],
    "Vellore": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members'],
    "Viluppuram": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members'],
    "Virudhunagar": ['One Men', 'One Women', 'Family', 'Men & Women', '6+ Members']
};

const bathroomCountData = {
    "Ariyalur": ['1', '2', '3', '4', '5', '5+'],
    "Chengalpattu": ['1', '2', '3', '4', '5', '5+'],
    "Chennai": ['1', '2', '3', '4', '5', '5+'],
    "Coimbatore": ['1', '2', '3', '4', '5', '5+'],
    "Cuddalore": ['1', '2', '3', '4', '5', '5+'],
    "Dharmapuri": ['1', '2', '3', '4', '5', '5+'],
    "Dindigul": ['1', '2', '3', '4', '5', '5+'],
    "Erode": ['1', '2', '3', '4', '5', '5+'],
    "Kallakurichi": ['1', '2', '3', '4', '5', '5+'],
    "Kanchipuram": ['1', '2', '3', '4', '5', '5+'],
    "Kanyakumari": ['1', '2', '3', '4', '5', '5+'],
    "Karur": ['1', '2', '3', '4', '5', '5+'],
    "Krishnagiri": ['1', '2', '3', '4', '5', '5+'],
    "Madurai": ['1', '2', '3', '4', '5', '5+'],
    "Nagapattinam": ['1', '2', '3', '4', '5', '5+'],
    "Namakkal": ['1', '2', '3', '4', '5', '5+'],
    "Nilgiris": ['1', '2', '3', '4', '5', '5+'],
    "Perambalur": ['1', '2', '3', '4', '5', '5+'],
    "Pudukkottai": ['1', '2', '3', '4', '5', '5+'],
    "Ramanathapuram": ['1', '2', '3', '4', '5', '5+'],
    "Ranipet": ['1', '2', '3', '4', '5', '5+'],
    "Salem": ['1', '2', '3', '4', '5', '5+'],
    "Sivagangai": ['1', '2', '3', '4', '5', '5+'],
    "Tenkasi": ['1', '2', '3', '4', '5', '5+'],
    "Thanjavur": ['1', '2', '3', '4', '5', '5+'],
    "Theni": ['1', '2', '3', '4', '5', '5+'],
    "Thoothukudi": ['1', '2', '3', '4', '5', '5+'],
    "Tiruchirappalli": ['1', '2', '3', '4', '5', '5+'],
    "Tirunelveli": ['1', '2', '3', '4', '5', '5+'],
    "Tirupattur": ['1', '2', '3', '4', '5', '5+'],
    "Tiruppur": ['1', '2', '3', '4', '5', '5+'],
    "Tiruvallur": ['1', '2', '3', '4', '5', '5+'],
    "Tiruvannamalai": ['1', '2', '3', '4', '5', '5+'],
    "Tiruvarur": ['1', '2', '3', '4', '5', '5+'],
    "Vellore": ['1', '2', '3', '4', '5', '5+'],
    "Viluppuram": ['1', '2', '3', '4', '5', '5+'],
    "Virudhunagar": ['1', '2', '3', '4', '5', '5+']
};

const propertyAgeData = {
    "Ariyalur": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years'],
    "Chengalpattu": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years'],
    "Chennai": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years'],
    "Coimbatore": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years'],
    "Cuddalore": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years'],
    "Dharmapuri": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years'],
    "Dindigul": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years'],
    "Erode": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years'],
    "Kallakurichi": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years'],
    "Kanchipuram": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years'],
    "Kanyakumari": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years'],
    "Karur": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years'],
    "Krishnagiri": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years'],
    "Madurai": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years'],
    "Nagapattinam": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years'],
    "Namakkal": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years'],
    "Nilgiris": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years'],
    "Perambalur": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years'],
    "Pudukkottai": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years'],
    "Ramanathapuram": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years'],
    "Ranipet": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years'],
    "Salem": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years'],
    "Sivagangai": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years'],
    "Tenkasi": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years'],
    "Thanjavur": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years'],
    "Theni": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years'],
    "Thoothukudi": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years'],
    "Tiruchirappalli": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years'],
    "Tirunelveli": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years'],
    "Tirupattur": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years'],
    "Tiruppur": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years'],
    "Tiruvallur": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years'],
    "Tiruvannamalai": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years'],
    "Tiruvarur": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years'],
    "Vellore": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years'],
    "Viluppuram": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years'],
    "Virudhunagar": ['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '5+ years']
};

const amenitiesData = {
    "Ariyalur": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital'],
    "Chengalpattu": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital'],
    "Chennai": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital'],
    "Coimbatore": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital'],
    "Cuddalore": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital'],
    "Dharmapuri": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital'],
    "Dindigul": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital'],
    "Erode": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital'],
    "Kallakurichi": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital'],
    "Kanchipuram": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital'],
    "Kanyakumari": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital'],
    "Karur": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital'],
    "Krishnagiri": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital'],
    "Madurai": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital'],
    "Nagapattinam": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital'],
    "Namakkal": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital'],
    "Nilgiris": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital'],
    "Perambalur": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital'],
    "Pudukkottai": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital'],
    "Ramanathapuram": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital'],
    "Ranipet": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital'],
    "Salem": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital'],
    "Sivagangai": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital'],
    "Tenkasi": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital'],
    "Thanjavur": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital'],
    "Theni": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital'],
    "Thoothukudi": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital'],
    "Tiruchirappalli": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital'],
    "Tirunelveli": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital'],
    "Tirupattur": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital'],
    "Tiruppur": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital'],
    "Tiruvallur": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital'],
    "Tiruvannamalai": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital'],
    "Tiruvarur": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital'],
    "Vellore": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital'],
    "Viluppuram": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital'],
    "Virudhunagar": ['Parking', 'Park', 'Power backup', 'Security', 'Lift', 'AC Room', 'Wifi', 'College', 'Hospital']
};
const furnishedData = {
    "Ariyalur": ['Furnished', 'Not Furnished'],
    "Chengalpattu": ['Furnished', 'Not Furnished'],
    "Chennai": ['Furnished', 'Not Furnished'],
    "Coimbatore": ['Furnished', 'Not Furnished'],
    "Cuddalore": ['Furnished', 'Not Furnished'],
    "Dharmapuri": ['Furnished', 'Not Furnished'],
    "Dindigul": ['Furnished', 'Not Furnished'],
    "Erode": ['Furnished', 'Not Furnished'],
    "Kallakurichi": ['Furnished', 'Not Furnished'],
    "Kanchipuram": ['Furnished', 'Not Furnished'],
    "Kanyakumari": ['Furnished', 'Not Furnished'],
    "Karur": ['Furnished', 'Not Furnished'],
    "Krishnagiri": ['Furnished', 'Not Furnished'],
    "Madurai": ['Furnished', 'Not Furnished'],
    "Nagapattinam": ['Furnished', 'Not Furnished'],
    "Namakkal": ['Furnished', 'Not Furnished'],
    "Nilgiris": ['Furnished', 'Not Furnished'],
    "Perambalur": ['Furnished', 'Not Furnished'],
    "Pudukkottai": ['Furnished', 'Not Furnished'],
    "Ramanathapuram": ['Furnished', 'Not Furnished'],
    "Ranipet": ['Furnished', 'Not Furnished'],
    "Salem": ['Furnished', 'Not Furnished'],
    "Sivagangai": ['Furnished', 'Not Furnished'],
    "Tenkasi": ['Furnished', 'Not Furnished'],
    "Thanjavur": ['Furnished', 'Not Furnished'],
    "Theni": ['Furnished', 'Not Furnished'],
    "Thoothukudi": ['Furnished', 'Not Furnished'],
    "Tiruchirappalli": ['Furnished', 'Not Furnished'],
    "Tirunelveli": ['Furnished', 'Not Furnished'],
    "Tirupattur": ['Furnished', 'Not Furnished'],
    "Tiruppur": ['Furnished', 'Not Furnished'],
    "Tiruvallur": ['Furnished', 'Not Furnished'],
    "Tiruvannamalai": ['Furnished', 'Not Furnished'],
    "Tiruvarur": ['Furnished', 'Not Furnished'],
    "Vellore": ['Furnished', 'Not Furnished'],
    "Viluppuram": ['Furnished', 'Not Furnished'],
    "Virudhunagar": ['Furnished', 'Not Furnished']
};

const areaData={
    "Ariyalur": ['Jayankondam', 'Sendurai', 'Udayarpalayam'],
    "Chengalpattu": ['Guduvancheri', 'Mahabalipuram', 'Thiruporur'],
    "Chennai": ['T. Nagar', 'Velachery', 'Adyar', 'Anna Nagar', 'Tambaram'],
    "Coimbatore": ['Sulur', 'Chinnayampalayam', 'Avinashi', 'Gandhipuram', 'Irugur', 'Saravanampatti', 'Peelamedu'],
    "Cuddalore": ['Neyveli', 'Chidambaram', 'Virudhachalam'],
    "Dharmapuri": ['Palacode', 'Harur', 'Pennagaram'],
    "Dindigul": ['Palani', 'Oddanchatram', 'Kodaikanal'],
    "Erode": ['Gobichettipalayam', 'Bhavani', 'Perundurai'],
    "Kallakurichi": ['Chinnasalem', 'Ulundurpet', 'Sankarapuram'],
    "Kanchipuram": ['Kundrathur', 'Sriperumbudur', 'Walajabad'],
    "Kanyakumari": ['Nagercoil', 'Marthandam', 'Thuckalay'],
    "Karur": ['Kulithalai', 'Aravakurichi', 'Krishnarayapuram'],
    "Krishnagiri": ['Hosur', 'Denkanikottai', 'Bargur'],
    "Madurai": ['Thiruparankundram', 'Periyar', 'Anna Nagar'],
    "Nagapattinam": ['Velankanni', 'Thirukkuvalai', 'Nagore'],
    "Namakkal": ['Rasipuram', 'Tiruchengode', 'Kumarapalayam'],
    "Nilgiris": ['Ooty', 'Coonoor', 'Kotagiri'],
    "Perambalur": ['Kunnam', 'Veppanthattai', 'Alathur'],
    "Pudukkottai": ['Aranthangi', 'Alangudi', 'Illupur'],
    "Ramanathapuram": ['Paramakudi', 'Rameswaram', 'Kamuthi'],
    "Ranipet": ['Walajah', 'Arakkonam', 'Arcot'],
    "Salem": ['Attur', 'Mettur', 'Edappadi'],
    "Sivagangai": ['Karaikudi', 'Devakottai', 'Thirupuvanam'],
    "Tenkasi": ['Sankarankovil', 'Kadayanallur', 'Courtallam'],
    "Thanjavur": ['Kumbakonam', 'Pattukkottai', 'Thiruvaiyaru'],
    "Theni": ['Periyakulam', 'Bodinayakanur', 'Uthamapalayam'],
    "Thoothukudi": ['Kovilpatti', 'Tiruchendur', 'Kayalpattinam'],
    "Tiruchirappalli": ['Srirangam', 'Thiruverumbur', 'Lalgudi'],
    "Tirunelveli": ['Palayamkottai', 'Tenkasi', 'Ambasamudram', 'Cheranmahadevi', 'Nanguneri', 'Sankarankovil', 'Alangulam', 'Vikramasingapuram', 'Kalakkad', 'Sivagiri', 'Manimutharu', 'Kadayam', 'Papanasam', 'Veeravanallur'],
    "Tirupattur": ['Vaniyambadi', 'Ambur', 'Natrampalli'],
    "Tiruppur": ['Avinashi', 'Dharapuram', 'Udumalpet'],
    "Tiruvallur": ['Ponneri', 'Gummidipoondi', 'Thiruvallur'],
    "Tiruvannamalai": ['Arani', 'Polur', 'Chengam'],
    "Tiruvarur": ['Mannargudi', 'Thiruthuraipoondi', 'Kodavasal'],
    "Vellore": ['Katpadi', 'Gudiyatham', 'Vaniyambadi'],
    "Viluppuram": ['Tindivanam', 'Kallakurichi', 'Gingee'],
    "Virudhunagar": ['Sivakasi', 'Rajapalayam', 'Aruppukkottai']
};
export default function Stocks() {
    const [email,setEmail]=useState('');
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        console.log(userId);
        axios.get(`http://localhost:4000/auth/profile/${userId}`)
            .then(response => {
                const { email } = response.data;
                console.log(response.data)
                setEmail(email);
            })
            .catch(error => {
                console.error("Error fetching user profile:", error);
            });
    }, []);
    const [data, setData] = useState({ category:'', name: '', price: '', available:'', bathroom:'',ageOfProperty:'', amenities: [], furnished:'', area: '', images: [] });
    const [showAddForm, setShowAddForm] = useState(false);
    const [showFileInput, setShowFileInput] = useState(true);
    const [displayedImages, setDisplayedImages] = useState(null);
    const [showAreaDropdown, setShowAreaDropdown] = useState(false);
    const [selectedArea, setAreaCategory] = useState([]);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [showAvailableDropdown, setShowAvailableDropdown] = useState(false);
    const [selectedAvailable, setSelectedAvailable] = useState([]);
    const [showBathroomDropdown, setShowBathroomDropdown] = useState(false);
    const [selectedBathroom, setSelectedBathroom] = useState([]);
    const [showPropertyAgeDropdown, setShowPropertyAgeDropdown] = useState(false);
    const [selectedPropertyAge, setSelectedPropertyAge] = useState([]);
    const [showAmenitiesDropdown, setShowAmenitiesDropdown] = useState(false);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isItemsVisible, setIsItemsVisible] = useState(false);
    const [isDeleteItemsVisible, setDeleteIsItemsVisible] = useState(false);
    const [isUpdate,setIsUpdate] = useState(false);
    const [editedItem, setEditedItem] = useState(null);
    const addItems = () => {
        setShowAddForm(prevState => !prevState); 
        setIsItemsVisible(false);
        setDeleteIsItemsVisible(false);
        setIsUpdate(false);
    };
    const deleteItems = () => {
        setDeleteIsItemsVisible(prevState => !prevState); 
        setShowAddForm(false); 
        setIsItemsVisible(false);
        setIsUpdate(false);
        if (!isDeleteItemsVisible) {
            fetchItems();
        }
    }
    const editItems = () => {
        setIsUpdate(prevState => !prevState); 
        setIsItemsVisible(false);
        setDeleteIsItemsVisible(false);
        setShowAddForm(false); 
        if (!isUpdate) {
            fetchItems();
        }
    };
    const fetchItems = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:4000/seller/items');
            setItems(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
        }
    };

    const displayItems = () => {
        setIsItemsVisible(prevState => !prevState); 
        setShowAddForm(false); 
        setDeleteIsItemsVisible(false);
        setIsUpdate(false);
        if (!isItemsVisible) {
            fetchItems();
        }
    };
    const deleteSelectedImages = () => {
        setDisplayedImages(null);
        setShowFileInput(true);
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setDisplayedImages(files);
        setShowFileInput(false);
        console.log(files);
    };

    const handleCategoryCheckboxChange = (value) => {
        const updatedSize = [...selectedCategory];
        if (updatedSize.includes(value)) {
            updatedSize.splice(updatedSize.indexOf(value), 1);
        } else {
            updatedSize.push(value);
        }
        setSelectedCategory(updatedSize);
        setShowCategoryDropdown(prevState => !prevState);
    };
    const handleAreaCheckboxChange = (value) => {
        const updatedArea = [...selectedCategory];
        if (updatedArea.includes(value)) {
            updatedArea.splice(updatedArea.indexOf(value), 1);
        } else {
            updatedArea.push(value);
        }
        setSelectedCategory(updatedArea);
        setShowCategoryDropdown(prevState => !prevState);
    };

    const handleAvailableCheckboxChange = (value) => {
        const updatedColor = [...selectedAvailable];
        if (updatedColor.includes(value)) {
            updatedColor.splice(updatedColor.indexOf(value), 1);
        } else {
            updatedColor.push(value);
        }
        setSelectedAvailable(updatedColor);
        setShowAvailableDropdown(prevState => !prevState);
    };

    const handleBathroomCheckboxChange = (value) => {
        const updatedColor = [...selectedBathroom];
        if (updatedColor.includes(value)) {
            updatedColor.splice(updatedColor.indexOf(value), 1);
        } else {
            updatedColor.push(value);
        }
        setSelectedBathroom(updatedColor);
        setShowBathroomDropdown(prevState => !prevState);
    };

    const handlePropertAgeCheckboxChange = (value) => {
        const updatedColor = [...selectedPropertyAge];
        if (updatedColor.includes(value)) {
            updatedColor.splice(updatedColor.indexOf(value), 1);
        } else {
            updatedColor.push(value);
        }
        setSelectedPropertyAge(updatedColor);
        setShowPropertyAgeDropdown(prevState => !prevState);
    };

    const handleAmenitiesCheckboxChange = (value) => {
        const updatedColor = [...selectedAmenities];
        if (updatedColor.includes(value)) {
            updatedColor.splice(updatedColor.indexOf(value), 1);
        } else {
            updatedColor.push(value);
        }
        setSelectedAmenities(updatedColor);
        setShowAmenitiesDropdown(prevState => !prevState);
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('category',data.category);
            formData.append('name', data.name);
            formData.append('price', data.price);
            formData.append('available', data.available);
            formData.append('bathroom', data.bathroom);
            formData.append('ageOfProperty', data.propertyAge);
            formData.append('amenities', JSON.stringify(selectedAmenities));
            formData.append('furnished', data.furnished);
            formData.append('area', data.area);
            for (let i = 0; i < displayedImages.length; i++) {
                formData.append('images', displayedImages[i]);
            }
            for (var pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }
            const response = await axios.post('http://localhost:4000/seller/store', formData);
            console.log('Data sent:', response.data);
            setData({ category:'', name: '', price: '', available:'', bathroom:'',ageOfProperty:'', amenities: [], furnished:'', area: '', images: [] });
            setDisplayedImages(null);
            setShowFileInput(true);
        } 
        catch (error) {
            console.error('Error:', error);
        }
    }
    const deleteSelectedItems = async (itemId) => {
        console.log(itemId);
        try {
            const response = await axios.delete(`http://localhost:4000/seller/items/${itemId}`);
            console.log('Deleted Item:', response.data);
            fetchItems();
        } 
        catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const editSelectedItems = (item) => {
        setEditedItem(item);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedItem(prevItem => ({
            ...prevItem,
            [name]: value
        }));
    };

    const updateItem = async () => {
        try {
            const response = await axios.put(`http://localhost:4000/seller/items/${editedItem._id}`, editedItem);
            console.log('Updated Item:', response.data);
            fetchItems();
            setEditedItem(null);
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    return (
        <div className='stocks'>
            <div className='heading'>Rentify</div>
            <div className='add-stocks'>
                <div className='stocks-options'>
                    <button className='add-products' onClick={addItems}>Add Items</button>
                    <button className='delete-products' onClick={deleteItems}>Delete Items</button>
                    <button className='edit-products' onClick={editItems}>Edit</button>
                    <button className='display-stock' onClick={displayItems}>Display</button>
                </div>
                {isUpdate && (
                    <>
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <>
                                <div className='items-container'>
                                    {items.map((item, index) => (
                                        <div key={index} className='item'>
                                            {item.images.length > 0 && (
                                                <div>
                                                    <img src={require(`../Uploads/${item.images[0]}`)} alt={item.name} className='item-img'/>
                                                </div>
                                            )}
                                            {editedItem && editedItem._id === item._id ? (
                                                <div className='edit-form'>
                                                    <input type='text' name='category' value={editedItem.category} onChange={handleEditChange} className='up-brand' />
                                                    <input type='number' name='price' value={editedItem.price} onChange={handleEditChange} className='up-price'/>
                                                    <button className='up-products' onClick={updateItem}>Update</button>
                                                </div>
                                            ) : (
                                                <>
                                                    <p>category: {item.category}</p>
                                                    <p>Price: {item.price}</p>
                                                    <button className='del-products' onClick={() => editSelectedItems(item)}>Edit Item</button>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                )}
                {isItemsVisible && (
                    <>
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <div className='items-container'>
                                {items.map((item, index) => (
                                    <div key={index} className='item'>
                                        {item.images.length > 0 && (
                                            <div>
                                                <img src={require(`../Uploads/${item.images[0]}`)} alt={item.name} className='item-img'/>
                                            </div>
                                        )}
                                        <p>category: {item.category}</p>
                                        <p>Price:{item.price}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
                {isDeleteItemsVisible && (
                    <>
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <>
                                <div className='items-container'>
                                    {items.map((item, index) => (
                                        <div key={index} className='item'>
                                            {item.images.length > 0 && (
                                                <div>
                                                    <img src={require(`../Uploads/${item.images[0]}`)} alt={item.name} className='item-img'/>
                                                </div>
                                            )}
                                            <p>Category: {item.category}</p>
                                            <p>Price:{item.price}</p>
                                            <button className='del-products' onClick={() => deleteSelectedItems(item._id)}>Delete Item</button>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                )}
                <div className='add-stocks-body'>
                    {
                        showAddForm && 
                        <div className='add-container'>
                            <div className='add-images'>
                                {
                                    showFileInput &&
                                    <div>
                                        <label htmlFor="myfileSingle" className="custom-file-input"><FiUploadCloud className='file-img' /> Add Image</label>
                                        <input type="file" id="myfileSingle" name="myfileSingle" onChange={handleImageChange} multiple />
                                    </div>
							                  }
							                  { 
                                    !displayedImages ? (<></>) : (
                                        <div className='selected-images-list'>
                                            <img src={URL.createObjectURL(displayedImages[0])} alt="Selected" className='select-img' />
                                        </div>
							                      )
                                }
							                  {
                                    displayedImages &&
                                        <div className='delete-button-container'>
                                            <button onClick={deleteSelectedImages} className='delete-button'>Delete</button>
                                        </div>
							                  }
                            </div>
                            <div className='add-data'>
                                <div className='add-form-data'>
                                    <input type='text' placeholder='Name' onChange={(e)=>setData({...data,name:e.target.value})}/>
                                    <input type='number' placeholder='Price' onChange={(e)=>setData({...data,price:e.target.value})}/>
                                    <input type='text' placeholder='Furnished' onChange={(e)=>setData({...data,furnished:e.target.value})}/>
                                    <div className='add-size'>
                                        <div className='size-dropdown' onClick={() => setShowAreaDropdown(!showCategoryDropdown)}>
                                            <div className='sizes-select-field'>
                                                Area<span></span>
                                                <RiArrowDropDownLine size={25} className='close-symbol' />
                                                {showAreaDropdown &&
                                                    <div className='dropdown-options'>
                                                        {areaData.areas.map((area, index) => (
                                                            <div key={area} >
                                                                <input type='checkbox' id={`size-${index}`} checked={selectedArea.includes(area)} onChange={() => handleAreaCheckboxChange(area)} />
                                                                <label htmlFor={`size-${index}`}>{area}</label>
                                                            </div>
                                                        ))}

                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='add-size'>
                                        <div className='size-dropdown' onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}>
                                            <div className='sizes-select-field'>
                                                Category<span></span>
                                                <RiArrowDropDownLine size={25} className='close-symbol' />
                                                {showCategoryDropdown &&
                                                    <div className='dropdown-options'>
                                                        {categoriesData.categories.map((category, index) => (
                                                            <div key={category} >
                                                                <input type='checkbox' id={`size-${index}`} checked={selectedCategory.includes(category)} onChange={() => handleCategoryCheckboxChange(category)} />
                                                                <label htmlFor={`size-${index}`}>{category}</label>
                                                            </div>
                                                        ))}

                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='add-size'>
                                        <div className='size-dropdown' onClick={() => setShowAvailableDropdown(!showAvailableDropdown)}>
                                            <div className='sizes-select-field'>
                                                Available
                                                <RiArrowDropDownLine size={25} className='close-symbol' />
                                                {showAvailableDropdown &&
                                                    <div className='dropdown-options'>
                                                        {availableData.available.map((size, index) => (
                                                            <div key={size}>
                                                                <input type='checkbox' id={`size-${index}`} checked={selectedAvailable.includes(size)} onChange={() => handleAvailableCheckboxChange(size)} />
                                                                <label htmlFor={`size-${index}`}>{size}</label>
                                                            </div>
                                                        ))}

                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='add-size'>
                                        <div className='size-dropdown' onClick={() => setShowBathroomDropdown(!showBathroomDropdown)}>
                                            <div className='sizes-select-field'>
                                                Bathrooms
                                                <RiArrowDropDownLine size={25} className='close-symbol' />
                                                {showBathroomDropdown &&
                                                    <div className='dropdown-options'>
                                                        {bathroomCountData.bathroom.map((size, index) => (
                                                            <div key={size}>
                                                                <input type='checkbox' id={`size-${index}`} checked={selectedBathroom.includes(size)} onChange={() => handleBathroomCheckboxChange(size)} />
                                                                <label htmlFor={`size-${index}`}>{size}</label>
                                                            </div>
                                                        ))}

                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='add-size'>
                                        <div className='size-dropdown' onClick={() => setShowPropertyAgeDropdown(!showPropertyAgeDropdown)}>
                                            <div className='sizes-select-field'>
                                                Age of Property
                                                <RiArrowDropDownLine size={25} className='close-symbol' />
                                                {showPropertyAgeDropdown &&
                                                    <div className='dropdown-options'>
                                                        {propertyAgeData.propertyAge.map((size, index) => (
                                                            <div key={size}>
                                                                <input type='checkbox' id={`size-${index}`} checked={selectedPropertyAge.includes(size)} onChange={() => handlePropertAgeCheckboxChange(size)} />
                                                                <label htmlFor={`size-${index}`}>{size}</label>
                                                            </div>
                                                        ))}

                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='add-size'>
                                        <div className='size-dropdown' onClick={() => setShowAmenitiesDropdown(!showAmenitiesDropdown)}>
                                            <div className='sizes-select-field'>
                                                Amenities
                                                <RiArrowDropDownLine size={25} className='close-symbol' />
                                                {showAmenitiesDropdown &&
                                                    <div className='dropdown-options'>
                                                        {amenitiesData.amenities.map((size, index) => (
                                                            <div key={size}>
                                                                <input type='checkbox' id={`size-${index}`} checked={selectedAmenities.includes(size)} onChange={() => handleAmenitiesCheckboxChange(size)} />
                                                                <label htmlFor={`size-${index}`}>{size}</label>
                                                            </div>
                                                        ))}

                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={handleSubmit} className='store-btn'>Add Item</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
