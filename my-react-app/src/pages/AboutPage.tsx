import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { usePollDataSourceStatus } from '../hooks/usePollDataSourceStatus'; // adjust path
import { useCallback, useEffect, useState } from 'react';
import DataSourcesTable from '../components/DataSourcesTable';


function AboutPage() {
  // const initialTotalNewFiles = 0;
  const [localTotalNewFiles, setTotalNewFiles] = useState(0);
  const [sessionId, setSessionId] = useState(19);

  const { startPolling, stopPolling, polledDataSources, totalNewFiles, pollError, } = usePollDataSourceStatus(
    sessionId
    , localTotalNewFiles
  );
  // const count = useSelector((state: RootState) => state.counter.value);

  useEffect(() => {
    startPolling(sessionId, 1, { force: true });
  }, [startPolling, stopPolling, sessionId, localTotalNewFiles]);

  return (
    <div>
      <h1>About Page</h1>
      {pollError && <p style={{ color: 'red' }}>Error: {pollError}</p>}
      <DataSourcesTable
          combinedDataSources={polledDataSources}
          dataFontSize="11px"
          columnsFontSize="12px"
        />
    </div>
  );
}

export default AboutPage;
