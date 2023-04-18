import { API_BASE_URL } from "@/constants/constants";
import axiosInstance from "@/redux/axios/axiosInterceptor";
import React, { useEffect, useState } from "react";
import Loader from "../Helper/Loader";
import { PatientHistory } from "@/types/patient";
import { capitalize, convertTimestamp } from "@/utils/convertTime";

const PatientHistoryRecords: React.FC<{ patientId: string }> = ({
  patientId,
}) => {
  const [patientHistory, setPatientHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const getPatientHistory = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `${API_BASE_URL}/patients/${patientId}/history`
      );
      setPatientHistory(response.data);
    } catch (error) {
      console.error(error, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPatientHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const HistoryOfPatient = () => {
    if (loading)
      return (
        <div className="flex justify-center h-32">
          <Loader isCard />
        </div>
      );

    if (patientHistory.length === 0)
      return <div> No History For {patientId}</div>;

    return (
      <div>
        <table className="table-auto min-w-950 overflow-auto">
          <thead>
            <tr>
              {Object.keys(patientHistory[0]).map(
                (title: string, index: number) => {
                  if (["firstName", "lastName", "age"].includes(title)) return;
                  return <th key={index}>{capitalize(title)}</th>;
                }
              )}
            </tr>
          </thead>
          <tbody>
            {patientHistory.map((data: PatientHistory, index: number) => {
              return (
                <tr
                  key={index}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <td>{data.bloodGroup}</td>
                  <td>{data.allergies}</td>
                  <td>{data.symptoms}</td>
                  <td>{data.diagnosis}</td>
                  <td>{data.treatment}</td>
                  <td>{data.followUp}</td>
                  <td>{data.changedBy}</td>
                  <td>{`${convertTimestamp(
                    parseInt(data.Timestamp.seconds)
                  )}`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="header min-w-fit rounded-3xl  px-3 py-1">
      <div className="p-3">
        <i className="fas fa-book mr-1"></i> Patient History -{" "}
        <span className="font-semibold">{patientId}</span>
      </div>
      <div className="p-3">
        <HistoryOfPatient />
      </div>
    </div>
  );
};

export default PatientHistoryRecords;
