import {
  Chart as ChartJS,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Assesments, Subjects, AssesmentType, Student } from "@prisma/client";

type chartData = {
  assesments: Assesments[];
  student: Student;
};

ChartJS.register(
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ChartDataLabels
);

export default function AssesmentGraphs({ assesments, student }: chartData) {
  const overallData = {
    labels: [
      "Sem 1",
      "Sem 2",
      "Sem 3",
      "Sem 4",
      "Sem 5",
      "Sem 6",
      "Sem 7",
      "Sem 8",
    ],
    datasets: [
      {
        label: "Overall",
        data: [
          student.sem1Score,
          student.sem2Score,
          student.sem3Score,
          student.sem4Score,
          student.sem5Score,
          student.sem6Score,
          student.sem7Score,
          student.sem8Score,
        ],
        backgroundColor: "rgba(0, 0, 255, 0.5)",
        datalabels: {
          color: "gray",
          anchor: "end",
          align: "end",
        },
      },
    ],
    options: {
      animation: {
        duration: 0,
      },
    },
  };

  let data = {
    labels: [Subjects.AI, Subjects.CN, Subjects.DP, Subjects.FE, Subjects.SEPM],
    datasets: [],
    options: {
      animation: {
        duration: 0,
      },
      plugins: {
        legend: {
          labels: {
            // This more specific font property overrides the global property
            font: {
              size: 500,
              weight: "bold",
            },
          },
        },
      },
    },
  };

  let TAEdata = {
    labels: [Subjects.AI, Subjects.CN, Subjects.DP, Subjects.FE, Subjects.SEPM],
    datasets: [],
    options: {
      animation: {
        duration: 0,
      },
      plugins: {
        legend: {
          labels: {
            // This more specific font property overrides the global property
            font: {
              size: 500,
              weight: "bold",
            },
          },
        },
      },
    },
  };

  assesments.map((assesment) =>
    TAEdata.datasets.push(
      //@ts-ignore
      assesment.name == AssesmentType.TAE
        ? {
            //@ts-ignore
            label: assesment.name,
            //@ts-ignore
            data: [
              assesment.score1,
              assesment.score2,
              assesment.score3,
              assesment.score4,
              assesment.score5,
            ],
            backgroundColor: "rgba(128, 0, 128, 0.5)",
            pointHoverBackgroundColor: "#fff",
            borderColor: "rgba(128, 0, 128, 0.3)",
            datalabels: {
              color: "gray",
              anchor: "end",
              align: "end",
            },
          }
        : {}
    )
  );

  assesments.map((assesment) =>
    data.datasets.push(
      //@ts-ignore
      assesment.name == AssesmentType.CAE1
        ? {
            //@ts-ignore
            label: assesment.name,
            //@ts-ignore
            data: [
              assesment.score1,
              assesment.score2,
              assesment.score3,
              assesment.score4,
              assesment.score5,
            ],
            backgroundColor: "rgba(128, 0, 128, 0.5)",
            pointHoverBackgroundColor: "#fff",
            borderColor: "rgba(128, 0, 128, 0.3)",
            datalabels: {
              color: "gray",
              anchor: "end",
              align: "end",
            },
          }
        : assesment.name == AssesmentType.CAE2
        ? {
            //@ts-ignore
            label: assesment.name,
            //@ts-ignore
            data: [
              assesment.score1,
              assesment.score2,
              assesment.score3,
              assesment.score4,
              assesment.score5,
            ],
            backgroundColor: "rgba(128, 0, 254, 0.5)",
            pointHoverBackgroundColor: "#fff",
            borderColor: "rgba(128, 0, 128, 0.3)",
            datalabels: {
              color: "gray",
              anchor: "end",
              align: "end",
            },
          }
        : {}
    )
  );

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Stats : </h1>
      <div className="flex">
        <div className="w-[30rem] mr-5">
          <h1 className="text-xl font-bold">Overall assesment Stats : </h1>
          <Bar
            //@ts-ignore
            data={overallData}
          />
        </div>
        <div className="w-[30rem] mr-5">
          <h1 className="text-xl font-bold">Continous Assesment Stats : </h1>
          <Bar data={data} />
        </div>
        <div className="w-[30rem] mr-5">
          <h1 className="text-xl font-bold">Teacher Assesment Stats : </h1>
          <Bar data={TAEdata} />
        </div>
      </div>
    </>
  );
}
