import DeptList from "@/components/apllList/Dept";
import MaterialList from "@/components/apllList/Material";
import ProjectList from "@/components/apllList/Project";
import UserList from "@/components/apllList/User";

const AllList=()=>{
    return(
        <div>
            <UserList/>
            <ProjectList/>
            <MaterialList/>
            <DeptList/>
        </div>
    )
}
export default AllList;