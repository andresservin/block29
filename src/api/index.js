const API_URL = 'https://fsa-puppy-bowl.herokuapp.com/api/2311-FTB-MT-WEB-PT/players';

export const getAllPlayers = async () =>{
    try{
    const response = await fetch(API_URL);
    const playersJson = await response.json();
    return playersJson.data.players;
} catch (err) {
    console.log(err);
    return null;
}
};
