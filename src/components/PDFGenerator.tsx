import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { FileDown, Loader2 } from "lucide-react";
import type { CSVData } from "../types";
import { generatePairings } from "../utils/pairings";

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 15,
    marginTop: 20,
    textAlign: "center",
  },
  pairingsSection: {
    marginBottom: 20,
  },
  emailsSection: {
    marginTop: 20,
  },
  table: {
    display: "flex",
    width: "auto",
    marginVertical: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
  },
  tableIndex: {
    width: 25,
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: "#000",
  },
  tableCell: {
    padding: 5,
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: "#000",
  },
  lastCell: {
    borderRightWidth: 0,
  },
  headerText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  cellText: {
    fontSize: 10,
  },
});

interface PDFDocumentProps {
  data: CSVData;
}

const PDFDocument: React.FC<PDFDocumentProps> = ({ data }) => {
  const pairings = generatePairings(data.parrains, data.filleuls);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Liste des Parrainages</Text>

        {/* Section des parrainages */}
        <View style={styles.pairingsSection}>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={styles.tableIndex}>
                <Text style={styles.headerText}>N°</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.headerText}>Parrain</Text>
              </View>
              <View style={[styles.tableCell, styles.lastCell]}>
                <Text style={styles.headerText}>Filleul</Text>
              </View>
            </View>
            {pairings.map((pair, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.tableIndex}>
                  <Text style={styles.cellText}>
                    {(index + 1).toString().padStart(2, "0")}
                  </Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>{pair.parrain.nom}</Text>
                </View>
                <View style={[styles.tableCell, styles.lastCell]}>
                  <Text style={styles.cellText}>{pair.filleul.nom}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

interface PDFGeneratorProps {
  data: CSVData | null;
}

export const PDFGenerator: React.FC<PDFGeneratorProps> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="mt-8 flex flex-col items-center">
      <div className="w-full max-w-md">
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Résumé :</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Nombre de parrains : {data.parrains.length}</span>
            <span>Nombre de filleuls : {data.filleuls.length}</span>
          </div>
        </div>

        <PDFDownloadLink
          document={<PDFDocument data={data} />}
          fileName="parrainages.pdf"
          className="w-full">
          {({ loading, error }) => (
            <button
              className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-all
                ${
                  loading
                    ? "bg-blue-400 cursor-wait"
                    : "bg-blue-600 hover:bg-blue-700 active:transform active:scale-95"
                }
                ${error ? "bg-red-600" : ""}`}
              disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Préparation du PDF...
                </>
              ) : error ? (
                "Erreur de génération"
              ) : (
                <>
                  <FileDown className="w-5 h-5" />
                  Télécharger le PDF
                </>
              )}
            </button>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
};
