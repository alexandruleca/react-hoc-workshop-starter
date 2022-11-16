import {useEffect, useState} from "react";
import api from "../helpers/api"

const UserList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});

    const fetchData = async () => {
        setIsLoading(true);
        await api.get('/users/2?delay=3')
            .then(res => {
                setIsLoading(false);
                setData(res.data);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div>Loading current user...</div>
        );
    }

    if (!data.id) {
        return (
            <div>Current user data not available.</div>
        );
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <img style={{maxWidth: 128}} src={data.avatar} alt={data.email}/>
            <span>{data.first_name} {data.last_name}</span>
            <span>{data.email}</span>
        </div>
    );
}

export default UserList;