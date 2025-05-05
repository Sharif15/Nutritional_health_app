// The endpoint for excercise information 

// The Get function for the route
// Will grab the list of excercise performed by the user on a day 

export async function GET(request:Request) {
    
    const { searchParams } = new URL(request.url);

    const user_id = searchParams.get("user_id");
    
    const date = searchParams.get("date");

    return new Response("Temp response", { status: 200 });

}

// The Post / Put function for the route 
// Used to add The given excercise to the users excercise_progress table 
// The fetch request should inclue the Excercise Enum {excercise_id,User_id,sets,reps} and use current date for the date 
// and (generate a id for the performance_id ) need to figure out how this whould be done 



//Function to filter input to prevent sql injection 



//The Detele function for the route 
// Used to delete the requested excercise from the users excercise progress table 





