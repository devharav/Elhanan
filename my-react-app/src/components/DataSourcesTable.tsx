import React from 'react';
import { format } from 'date-fns';
import {
  Paper,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer
} from '@mui/material';
import type { DataSource } from '../types/dataSource';

// Define the shape of a single data source item


// Props interface
interface DataSourcesTableProps {
  combinedDataSources: DataSource[];
  dataFontSize?: string;
  columnsFontSize?: string;
}

const DataSourcesTable: React.FC<DataSourcesTableProps> = ({
  combinedDataSources,
  dataFontSize = '0.875rem',
  columnsFontSize = '0.875rem',
}) => (
  <TableContainer
    component={Paper}
    sx={{
      maxHeight: 400,
      overflowY: 'auto',
    }}
  >
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontSize: columnsFontSize }}>#</TableCell>
          <TableCell sx={{ fontSize: columnsFontSize }}>Type</TableCell>
          <TableCell sx={{ fontSize: columnsFontSize }}>Name</TableCell>
          <TableCell sx={{ fontSize: columnsFontSize }}>Status</TableCell>
          <TableCell sx={{ fontSize: columnsFontSize }}>From</TableCell>
          <TableCell sx={{ fontSize: columnsFontSize }}>To</TableCell>
          <TableCell sx={{ fontSize: columnsFontSize }}>Duration (HH:MM:SS)</TableCell>
          <TableCell sx={{ fontSize: columnsFontSize }}>Size (MB)</TableCell>
          <TableCell sx={{ fontSize: columnsFontSize }}>Records</TableCell>
          <TableCell sx={{ fontSize: columnsFontSize }}>Failed Records</TableCell>
          <TableCell sx={{ fontSize: columnsFontSize }}>Added</TableCell>
          <TableCell sx={{ fontSize: columnsFontSize }}>Added By</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {[...combinedDataSources]
          .sort((a, b) => {
            const dateA = new Date(a.uploadedTime || 0).getTime();
            const dateB = new Date(b.uploadedTime || 0).getTime();
            const dateDiff = dateB - dateA;
            return dateDiff !== 0 ? dateDiff : (b.dataSourceId - a.dataSourceId);
          })
          .map((source, index, sortedArray) => (
            <TableRow key={source.dataSourceId || index}>
              <TableCell sx={{ fontSize: dataFontSize }}>{sortedArray.length - index}</TableCell>
              <TableCell sx={{ fontSize: dataFontSize }}>{source.type}</TableCell>
              <TableCell sx={{ fontSize: dataFontSize }}>{source.name || 'N/A'}</TableCell>
              <TableCell sx={{ fontSize: dataFontSize }}>{source.status || 'N/A'}</TableCell>
              <TableCell sx={{ fontSize: dataFontSize }}>
                {source.from ? format(new Date(source.from), 'dd/MM/yy HH:mm:ss') : 'N/A'}
              </TableCell>
              <TableCell sx={{ fontSize: dataFontSize }}>
                {source.to ? format(new Date(source.to), 'dd/MM/yy HH:mm:ss') : 'N/A'}
              </TableCell>
              <TableCell sx={{ fontSize: dataFontSize }}>{source.duration || 'N/A'}</TableCell>
              <TableCell sx={{ fontSize: dataFontSize }}>{source.fileSize ?? 0}</TableCell>
              <TableCell sx={{ fontSize: dataFontSize }}>{source.records ?? 'N/A'}</TableCell>
              <TableCell sx={{ fontSize: dataFontSize }}>N/A</TableCell>
              <TableCell sx={{ fontSize: dataFontSize }}>
                {source.uploadedTime ? format(new Date(source.uploadedTime), 'dd/MM/yy HH:mm') : 'N/A'}
              </TableCell>
              <TableCell sx={{ fontSize: dataFontSize }}>{source.uploaderUser || 'N/A'}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default DataSourcesTable;
