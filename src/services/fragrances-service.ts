import axios from "axios";

export const getFragranceByBrand = async (scent: string): Promise <Record<string,string>[]> => {

    const options = {
        method: 'GET',
        url: `https://fragrancefinder-api.p.rapidapi.com/perfumes/search?q=${scent}`,
        headers: {
            'X-RapidAPI-Key': 'ee9474d3ffmsh56aa7cfcbb516b6p13f80cjsn59252ec9708f',
            'X-RapidAPI-Host': 'fragrancefinder-api.p.rapidapi.com'
        },
    };
    const response = await axios.request(options);
    return(response.data);
    
}

