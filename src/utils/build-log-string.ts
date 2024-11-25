export const buildLogString = ({ req, status, duration }) => {
  const { method, url, query, body } = req;
  const urlLog = `HTTP ${method} ${url}`;
  const queryLog = Object.keys(query).length
    ? ` - Query: ${JSON.stringify(query)}`
    : '';
  const bodyLog = body ? ` - Body: ${JSON.stringify(body)}` : '';
  const statusLog = ` - Status: ${status} - ${duration}ms`;
  return `${urlLog}${queryLog}${bodyLog}${statusLog}`;
};
