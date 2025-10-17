import AddTodo from "../components/dashboard/AddTodo";
import Header from "../components/dashboard/Header";
import Todos from "../components/dashboard/Todos";

function Dashboard(){
    return(
        <div className="relative">
            <Header />
            <Todos />
            <AddTodo />
        </div>
    )
}

export default Dashboard;