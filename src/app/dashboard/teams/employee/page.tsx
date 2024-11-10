import Employees from "@/views/teams/employee/employee"

const Employee = () => {
  return (
    <div className='h-full relative'>
      <div>
        <h1 className="text-[28px] font-[700] text-[#0F1625]">Employees</h1>
        <p className="text-[14px] font-[400] text-[#323B49]">
          Manage employees here.
        </p>
      </div>

      <Employees />
    </div>
  )
}

export default Employee