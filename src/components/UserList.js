import {useEffect, useState} from "react";
import api from "../helpers/api"

const UserListItem = ({user}) => {
    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.email}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td><img src={user.avatar} alt={user.email}/></td>
        </tr>
    );
};

const UserList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [list, setList] = useState({});
    const [pagination, setPagination] = useState({
        page: 0,
        perPage: 0,
        total: 0,
        totalPages: 0,
        enabled: false,
    });

    const fetchData = async () => {
        setIsLoading(true);
        await api.get(`/users?delay=4&page=${currentPage}`)
            .then(res => {
                setIsLoading(false);
                setList(res);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    useEffect(() => {
        setPagination({
            page: list.page,
            perPage: list.per_page,
            total: list.total,
            totalPages: list.total_pages,
            enabled: true,
        });
    }, [list])

    if (isLoading) {
        return (
            <div>Loading users...</div>
        );
    }

    if (!list.data || (list.data && !list.data.length)) {
        return (
            <div>No user data available</div>
        );
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Email</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Avatar</th>
                </tr>
            </thead>
            <tbody>
            {list.data.map((user, i) => {
                return (
                    <UserListItem key={i} user={user}/>
                );
            })}
            </tbody>
            {pagination.enabled ? (
                <tfoot>
                    <tr>
                        <td><a onClick={() => { setCurrentPage(currentPage - 1) }}>&lt;</a></td>
                        <td>{pagination.page}</td>
                        <td><a onClick={() => { setCurrentPage(currentPage + 1) }}>&gt;</a></td>
                    </tr>
                </tfoot>
            ) : null}
        </table>
    );
}

export default UserList;