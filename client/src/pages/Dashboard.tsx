import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';


const Dashboard = () => {
  const uData = [4, 5, 3, 2];
  const xLabels = ['0 - 150', '150 - 350', '350 - 500', '500 - Above'];
  return (
    <div>
      <div>
        <h2 className='text-2xl text-red-950'>Schools And Payement:</h2>
        <div className='flex flex-row items-end gap-20 ml-[] w-[90%]'>
          <div>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: 'Payed' },
                    { id: 1, value: 15, label: 'Not Payed' },
                  ],
                },
              ]}
              width={300}
              height={150}
            />
            <div>
              <h2>Total Number of Schools: <span>12</span></h2>
              <h2>Total Number of Students: <span>12</span></h2>
            </div>
          </div>
          <div>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 15000, label: 'Payed' },
                    { id: 1, value: 135000, label: 'Not Payed' },
                  ],
                },
              ]}
              width={300}
              height={150}
            />
            <div>
              <h2>Total Projected Money: <span>1500000</span></h2>
              <h2>Total Money Payed: <span>150000</span></h2>
            </div>
          </div>
          <div>
            <BarChart
              xAxis={[{ scaleType: 'band', data: xLabels }]}
              series={[{data:uData, label:'uv', type:'bar'}]}
              width={250}
              height={200}
              bottomAxis={{
                // labelStyle: {
                //   fontSize: 14,
                //   transform: `translateY(${
                //     // Hack that should be added in the lib latter.
                //     5 * Math.abs(Math.sin((Math.PI * 45) / 180))
                //     }px)`
                // },
                tickLabelStyle: {
                  angle: 45,
                  textAnchor: 'start',
                  fontSize: 12,
                },
              }}

            />
          </div>
        </div>
      </div>

    </div>

  );
}

export default Dashboard