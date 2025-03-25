import axios from "axios";

export const getFragranceByBrand = async (scent: string): Promise <Record<string,string>[]> => {

    const options = {
        method: 'GET',
        url: `https://fragrancefinder-api.p.rapidapi.com/perfumes/search?q=${scent}`,
        headers: {
            'X-RapidAPI-Key': '29d92a11f7msh9f856f6d243ae9bp13ba38jsn93e1538e5e39',
            'X-RapidAPI-Host': 'fragrancefinder-api.p.rapidapi.com'
        },
    };
    const response = await axios.request(options);
    return(response.data);
    
}

