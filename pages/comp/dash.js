import fetch from "isomorphic-unfetch";
import { Button, Card } from "semantic-ui-react";
import Link from "next/link";
import { useState } from "react";

const Dashboard = ({ testResults }) => {
  let temp;
  let city;
  let tempResults;
  const [newResults, setNewResults] = useState(testResults);
  const [view, setView] = useState(true);

  const onCityChange = ({ target: { value } }) => {
    city = value;
  };

  const handleSubmit = () => {
    tempResults = testResults.filter((el) => {
      return el.city === city;
    });
    setNewResults(tempResults);
    setView(false);
  };
  const handleReset = () => {
    setView(true);
  };
  if (testResults && view) {
    return (
      <div>
        <input type="text" onChange={onCityChange} value={temp} />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleReset}>Reset</button>
        <h1>Coding Test Report</h1>
        <div id="list">
          {testResults.map((testResult) => {
            return (
              <div key={testResult._id}>
                <Card>
                  <Card.Content>
                    <Card.Header>
                      <Link href={`/test/${testResult._id}`}>
                        <a>{testResult.candidate_email}</a>
                      </Link>
                      <p>From {testResult.city}</p>
                    </Card.Header>
                  </Card.Content>
                  <Card.Content extra>
                    <Link href={`/test/${testResult._id}`}>
                      <Button primary>View Codes</Button>
                    </Link>
                  </Card.Content>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <input type="text" onChange={onCityChange} value={temp} />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleReset}>Reset</button>

        <h1>Coding Test Report</h1>
        <div id="list">
          {newResults.map((testResult) => {
            return (
              <div key={testResult._id}>
                <Card>
                  <Card.Content>
                    <Card.Header>
                      <Link href={`/test/${testResult._id}`}>
                        <a>{testResult.candidate_email}</a>
                      </Link>
                      <p>From {testResult.city}</p>
                    </Card.Header>
                  </Card.Content>
                  <Card.Content extra>
                    <Link href={`/test/${testResult._id}`}>
                      <Button primary>View Codes</Button>
                    </Link>
                  </Card.Content>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

Dashboard.getInitialProps = async () => {
  const res = await fetch("https://dragon-tester.now.sh/api/codetest");
  const { data } = await res.json();
  return { testResults: data };
};

export default Dashboard;
