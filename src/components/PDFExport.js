import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
  },
});

const PDFExport = ({ webActivities }) => {
  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.title}>Web Activities Report</Text>
            {webActivities.map((activity, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={styles.subtitle}>Activity {index + 1}</Text>
                <Text style={styles.text}>Date: {format(new Date(activity.date), 'yyyy-MM-dd')}</Text>
                <Text style={styles.text}>User: {activity.user}</Text>
                <Text style={styles.text}>URL: {activity.name}</Text> {/* Use activity.url for URL */}
                <Text style={styles.text}>Usage: {activity.usage} seconds</Text>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDFExport;
