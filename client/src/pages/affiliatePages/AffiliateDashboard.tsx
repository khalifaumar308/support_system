import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell
} from "recharts";

const AffiliateDashboard = () => {
  const data = [
    { name: "Geeksforgeeks", students: 400 },
    { name: "Technical scripter", students: 700 },
    { name: "Geek-i-knack", students: 200 },
    { name: "Geek-o-mania", students: 1000 },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="flex w-full">
      <div>
        <BarChart width={600} height={600} data={data}>
          <Bar dataKey="students" fill="green" />
          {/* <CartesianGrid stroke="#ccc" /> */}
          <XAxis dataKey="name" />
          <YAxis />
        </BarChart>
      </div>
      <div className="mt-[100px] w-full">
        <PieChart width={500} height={500}>
          <Pie data={data} dataKey="students" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  );
}

export default AffiliateDashboard