import React, { useState } from "react";
import { useCSVReader } from "react-papaparse";
import { FileText, Upload, CheckCircle2 } from "lucide-react";
import type { Person, CSVData } from "../types";

interface CSVUploadFormProps {
  onDataLoaded: (data: CSVData) => void;
}

export const CSVUploadForm: React.FC<CSVUploadFormProps> = ({
  onDataLoaded,
}) => {
  const { CSVReader } = useCSVReader();
  const [parrainsData, setParrainsData] = useState<Person[]>([]);
  const [filleulsData, setFilleulsData] = useState<Person[]>([]);

  const handleCSVLoad = (results: any, type: "parrains" | "filleuls") => {
    const data = results.data.slice(1).map((row: string[]) => ({
      nom: row[0],
    }));

    if (type === "parrains") {
      setParrainsData(data.filter((person: Person) => person.nom !== ""));
    } else {
      setFilleulsData(data.filter((person: Person) => person.nom !== ""));
    }
  };

  const handleSubmit = () => {
    if (parrainsData.length > 0 && filleulsData.length > 0) {
      onDataLoaded({ parrains: parrainsData, filleuls: filleulsData });
    }
  };

  const isReadyToSubmit = parrainsData.length > 0 && filleulsData.length > 0;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Liste des Parrains</h2>
        <CSVReader
          onUploadAccepted={(results: any) =>
            handleCSVLoad(results, "parrains")
          }>
          {({ getRootProps }: any) => (
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-500 transition-colors">
              <div className="flex flex-col items-center space-y-2">
                {parrainsData.length > 0 ? (
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                ) : (
                  <Upload className="w-8 h-8 text-gray-400" />
                )}
                <p className="text-sm text-gray-600">
                  Cliquez ou glissez le fichier CSV des parrains ici
                </p>
                {parrainsData.length > 0 && (
                  <div className="flex items-center text-green-600">
                    <FileText className="w-4 h-4 mr-2" />
                    <span>{parrainsData.length} parrains chargés</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </CSVReader>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Liste des Filleuls</h2>
        <CSVReader
          onUploadAccepted={(results: any) =>
            handleCSVLoad(results, "filleuls")
          }>
          {({ getRootProps }: any) => (
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-500 transition-colors">
              <div className="flex flex-col items-center space-y-2">
                {filleulsData.length > 0 ? (
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                ) : (
                  <Upload className="w-8 h-8 text-gray-400" />
                )}
                <p className="text-sm text-gray-600">
                  Cliquez ou glissez le fichier CSV des filleuls ici
                </p>
                {filleulsData.length > 0 && (
                  <div className="flex items-center text-green-600">
                    <FileText className="w-4 h-4 mr-2" />
                    <span>{filleulsData.length} filleuls chargés</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </CSVReader>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isReadyToSubmit}
        className={`w-full mt-6 py-3 px-4 rounded-lg font-medium transition-all
          ${
            isReadyToSubmit
              ? "bg-green-600 text-white hover:bg-green-700 active:transform active:scale-95"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }
        `}>
        Générer le PDF
      </button>
    </div>
  );
};
