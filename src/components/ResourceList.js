import {useEffect, useState} from "react";
import api from "../helpers/api"

const ResourceListItem = ({user}) => {
    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.pantone_value}</td>
            <td>{user.year}</td>
        </tr>
    );
};

const ResourceList = () => {
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
        await api.get(`/resources?delay=5&page=${currentPage}`)
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
            <div>Loading resources...</div>
        );
    }

    if (!list.data || (list.data && !list.data.length)) {
        return (
            <div>No resource data available</div>
        );
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Color</th>
                    <th>Year</th>
                </tr>
            </thead>
            <tbody>
            {list.data.map((user, i) => {
                return (
                    <ResourceListItem key={i} user={user}/>
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

export default ResourceList;