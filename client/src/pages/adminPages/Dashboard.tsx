import { useGetUsersQuery, useGetSchoolsQuery } from '../../store/slices/api/apiEndpoints';
import { useCallback } from 'react';


const Dashboard = () => {
  const { data: users, isLoading } = useGetUsersQuery({ id: false });
  const { data: schools, isLoading: sLoading } = useGetSchoolsQuery({ id: false });
  const loading = isLoading || sLoading;

  // const uData = [4, 5, 3, 2];
  // const xLabels = ['0 - 150', '150 - 350', '350 - 500', '500 - Above'];
  const totalStudents = useCallback(() => {
    if (!loading && schools) {
      let total = 0;
      let projMoney = 0;
      let payedMoney = 0;
      let unboardedS = 0;
      let trainedS = 0;
      schools.schools.forEach(({ students, trained, package:sPackage, payment, onboarded }) => {
        total += students
        if (onboarded) {
          unboardedS += 1
        }
        if (trained && sPackage) {
          trainedS += 1
          projMoney += sPackage * students
          if (payment && payment[payment?.length -1 ]) {
            payedMoney += sPackage*students
          }
        }
      })
      return [total, projMoney, payedMoney, unboardedS, trainedS]
    }
    return [0,0,0,0,0]
  }, [loading, schools])
  const [students, pMoney, payed, numOnboard, numTrained] = totalStudents()

  return loading? <div>Loading...</div> :(
    <div>
      <div>
        <h2 className='text-2xl text-red-950 mb-4'>Schools And Payment:</h2>
        <div className='flex flex-col sm:flex-row items-end gap-4 ml-[] w-[90%]'>
          <div>
            <div className='bg-[#00c274] text-white font-mi rounded-sm shadow-md text-2xl shadow-gray-400 p-2 mr-1'>
              <h2>Total Number of Schools: <span>{ schools?.schools.length }</span></h2>
              <h2>Total Number of Students: <span>{ students }</span></h2>
            </div>
          </div>
          <div>
            <div className='bg-[#00c274] text-white font-mi rounded-sm shadow-md text-2xl shadow-gray-400 p-2 mr-1'>
              <h2>Total Projected Money: <span>{pMoney}</span></h2>
              <h2>Total Money Payed: <span>{payed}</span></h2>
            </div>
          </div>
          <div>
            <div className='bg-[#00c274] text-white font-mi rounded-sm shadow-md text-2xl shadow-gray-400 p-2 mr-1'>
              <h2>Total Onboarded Schools: <span>{numOnboard}</span></h2>
              <h2>Total Trained Schools: <span>{numTrained}</span></h2>
            </div>
          </div>
        </div>
        <div className='mt-4'>Total Affiliates: { users?.affiliates.length }</div>
      </div>

    </div>

  );
}

export default Dashboard