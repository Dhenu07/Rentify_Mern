import React, { useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import DropdownContent from './DropdownContent';
import { IoClose } from "react-icons/io5";
import FilterContent from './Filter.Results';
import '../Styles/Filter.css'
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

function Filter(props) {
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [showPriceDropdown, setShowPriceDropdown] = useState(false);
    const [showAvailableDropdown, setShowAvailableDropdown] = useState(false);
    const [showNumberOfBathroomsDropdown, setShowNumberOfBathroomsDropdown] = useState(false);
    const [showAgeOfProperty, setShowAgeOfProperty] = useState(false);
    const [showAmenitiesDropdown, setShowAmenitiesDropdown] = useState(false);
    const [showFurnishedStatusDropdown, setShowFurnishedStatusDropdown] = useState(false);
    const [showAreaDropdown, setShowAreaDropdown] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState([]);
    const [selectedAvailable, setSelectedAvailable] = useState([]);
    const [selectedNumberOfBathrooms, setSelectedNumberOfBathrooms] = useState([]);
    const [selectedAgeOfProperty, setSelectedAgeOfProperty] = useState([]);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [selectedFurnished, setSelectedFurnished] = useState([]);
    const [selectedArea, setSelectedArea] = useState([]);

    const [checkedItems, setCheckedItems] = useState({
        category: [],
        price: [],
        available: [],
        bathrooms: [],
        ageOfProperty: [],
        amenities: [],
        furnished: [],
        area: []
    });
    console.log(checkedItems);
    const renderCategoryItem = (item) => (
        <div className='category-item'>
            {item}
            <input
                type='checkbox'
                value={item}
                className='checkbox-right'
                onChange={() => handleCheckboxChange(item, selectedCategory, setSelectedCategory, 'category')}
                checked={checkedItems.category.includes(item)}
            />
        </div>
    );

    const renderPriceItem = (item) => (
        <div className='price-item'>
            {item}
            <input
                type='checkbox'
                value={item}
                className='checkbox-right'
                onChange={() => handleCheckboxChange(item, selectedPrice, setSelectedPrice, 'price')}
                checked={checkedItems.price.includes(item)}
            />
        </div>
    );

    const renderAvailableItem = (item) => (
        <div className='available-item'>
            {item}
            <input
                type='checkbox'
                value={item}
                className='checkbox-right'
                onChange={() => handleCheckboxChange(item, selectedAvailable, setSelectedAvailable, 'available')}
                checked={checkedItems.available.includes(item)}
            />
        </div>
    );

    const renderBathroomItem = (item) => (
        <div className='bathroom-item'>
            {item}
            <input
                type='checkbox'
                value={item}
                className='checkbox-right'
                onChange={() => handleCheckboxChange(item, selectedNumberOfBathrooms, setSelectedNumberOfBathrooms, 'bathrooms')}
                checked={checkedItems.bathrooms.includes(item)}
            />
        </div>
    );

    const renderAgeOfPropertyItem = (item) => (
        <div className='ageOfProperty-item'>
            {item}
            <input
                type='checkbox'
                value={item}
                className='checkbox-right'
                onChange={() => handleCheckboxChange(item, selectedAgeOfProperty, setSelectedAgeOfProperty, 'ageOfProperty')}
                checked={checkedItems.ageOfProperty.includes(item)}
            />
        </div>
    );

    const renderAmenitiesItem = (item) => (
        <div className='amenities-item'>
            {item}
            <input
                type='checkbox'
                value={item}
                className='checkbox-right'
                onChange={() => handleCheckboxChange(item, selectedAmenities, setSelectedAmenities, 'amenities')}
                checked={checkedItems.amenities.includes(item)}
            />
        </div>
    );

    const renderFurnishedItem = (item) => (
        <div className='furnished-item'>
            {item}
            <input
                type='checkbox'
                value={item}
                className='checkbox-right'
                onChange={() => handleCheckboxChange(item, selectedFurnished, setSelectedFurnished, 'furnished')}
                checked={checkedItems.furnished.includes(item)}
            />
        </div>
    );

    const renderAreaItem = (item) => (
        <div className='area-item'>
            {item}
            <input
                type='checkbox'
                value={item}
                className='checkbox-right'
                onChange={() => handleCheckboxChange(item, selectedArea, setSelectedArea, 'area')}
                checked={checkedItems.area.includes(item)}
            />
        </div>
    );

    const handleCheckboxChange = (item, selectedList, setSelectedList, filterType) => {
        const updatedList = selectedList.includes(item)
            ? selectedList.filter((selectedItem) => selectedItem !== item)
            : [...selectedList, item];

        setSelectedList(updatedList);
        const updatedCheckedItems = { ...checkedItems, [filterType]: updatedList };
        setCheckedItems(updatedCheckedItems);
    };

    const deleteSelectedItem = (item, selectedList, setSelectedList, filterType) => {
        const updatedList = selectedList.filter((selectedItem) => selectedItem !== item);
        setSelectedList(updatedList);
        const updatedCheckedItems = { ...checkedItems, [filterType]: updatedList };
        setCheckedItems(updatedCheckedItems);

        const checkbox = document.querySelector(`input[type="checkbox"][value="${item}"]`);
        if (checkbox) {
            checkbox.checked = false;
        }
    }
    return (
        <div className="rental-container">
            <div className="rental-filter">
                <h2 className="shop-title">Shop By: {props.location}</h2>
                <div className="selected-list">
                    {selectedCategory.map((item) => (
                        <span key={item} className='selected'>{item}<IoClose className='close' onClick={() => deleteSelectedItem(item, selectedCategory, setSelectedCategory, 'category')} /></span>
                    ))}
                    {selectedPrice.map((item) => (
                        <span key={item} className='selected'>{item}<IoClose className='close' onClick={() => deleteSelectedItem(item, selectedPrice, setSelectedPrice, 'price')} /></span>
                    ))}
                    {selectedAvailable.map((item) => (
                        <span key={item} className='selected'>{item}<IoClose className='close' onClick={() => deleteSelectedItem(item, selectedAvailable, setSelectedAvailable, 'available')} /></span>
                    ))}
                    {selectedNumberOfBathrooms.map((item) => (
                        <span key={item} className='selected'>{item}<IoClose className='close' onClick={() => deleteSelectedItem(item, selectedNumberOfBathrooms, setSelectedNumberOfBathrooms, 'bathrooms')} /></span>
                    ))}
                    {selectedAgeOfProperty.map((item) => (
                        <span key={item} className='selected'>{item}<IoClose className='close' onClick={() => deleteSelectedItem(item, selectedAgeOfProperty, setSelectedAgeOfProperty, 'ageOfProperty')} /></span>
                    ))}
                    {selectedAmenities.map((item) => (
                        <span key={item} className='selected'>{item}<IoClose className='close' onClick={() => deleteSelectedItem(item, selectedAmenities, setSelectedAmenities, 'amenities')} /></span>
                    ))}
                    {selectedFurnished.map((item) => (
                        <span key={item} className='selected'>{item}<IoClose className='close' onClick={() => deleteSelectedItem(item, selectedFurnished, setSelectedFurnished, 'furnished')} /></span>
                    ))}
                    {selectedArea.map((item) => (
                        <span key={item} className='selected'>{item}<IoClose className='close' onClick={() => deleteSelectedItem(item, selectedArea, setSelectedArea, 'area')} /></span>
                    ))}
                </div>
                <div className="filters">
                    <div className="category" onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}>
                        Categories{showCategoryDropdown ? <IoMdArrowDropup className='drop-icon' /> : <IoMdArrowDropdown className='drop-icon' />}
                    </div>
                    {showCategoryDropdown && <DropdownContent items={categoriesData[props.location]} renderItem={renderCategoryItem} />}
                    <div className="price" onClick={() => setShowPriceDropdown(!showPriceDropdown)}>
                        Price{showPriceDropdown ? <IoMdArrowDropup className='drop-icon' /> : <IoMdArrowDropdown className='drop-icon' />}
                    </div>
                    {showPriceDropdown && <DropdownContent items={priceData[props.location]} renderItem={renderPriceItem} />}
                    <div className="available" onClick={() => setShowAvailableDropdown(!showAvailableDropdown)}>
                        Available{showAvailableDropdown ? <IoMdArrowDropup className='drop-icon' /> : <IoMdArrowDropdown className='drop-icon' />}
                    </div>
                    {showAvailableDropdown && <DropdownContent items={availableData[props.location]} renderItem={renderAvailableItem} />}
                    <div className="numberOfBathrooms" onClick={() => setShowNumberOfBathroomsDropdown(!showNumberOfBathroomsDropdown)}>
                        No.Of Bathrooms{showNumberOfBathroomsDropdown ? <IoMdArrowDropup className='drop-icon' /> : <IoMdArrowDropdown className='drop-icon' />}
                    </div>
                    {showNumberOfBathroomsDropdown && <DropdownContent items={bathroomCountData[props.location]} renderItem={renderBathroomItem} />}
                    <div className="ageOfProperty" onClick={() => setShowAgeOfProperty(!showAgeOfProperty)}>
                        Age of Property{showAgeOfProperty ? <IoMdArrowDropup className='drop-icon' /> : <IoMdArrowDropdown className='drop-icon' />}
                    </div>
                    {showAgeOfProperty && <DropdownContent items={propertyAgeData[props.location]} renderItem={renderAgeOfPropertyItem} />}
                    <div className="amenities" onClick={() => setShowAmenitiesDropdown(!showAmenitiesDropdown)}>
                        Amenities{showAmenitiesDropdown ? <IoMdArrowDropup className='drop-icon' /> : <IoMdArrowDropdown className='drop-icon' />}
                    </div>
                    {showAmenitiesDropdown && <DropdownContent items={amenitiesData[props.location]} renderItem={renderAmenitiesItem} />}
                    <div className="furnished" onClick={() => setShowFurnishedStatusDropdown(!showFurnishedStatusDropdown)}>
                        Furnished Status{showFurnishedStatusDropdown ? <IoMdArrowDropup className='drop-icon' /> : <IoMdArrowDropdown className='drop-icon' />}
                    </div>
                    {showFurnishedStatusDropdown && <DropdownContent items={furnishedData[props.location]} renderItem={renderFurnishedItem} />}
                    <div className="area" onClick={() => setShowAreaDropdown(!showAreaDropdown)}>
                        Area{showAreaDropdown ? <IoMdArrowDropup className='drop-icon' /> : <IoMdArrowDropdown className='drop-icon' />}
                    </div>
                    {showAreaDropdown && <DropdownContent items={areaData[props.location]} renderItem={renderAreaItem} />}
                </div>
            </div>
            <div>
                <FilterContent val={checkedItems} location={props.location} />
            </div>
        </div>
    );
}

export default Filter