import { Typography } from "antd"
import Title from "antd/lib/typography/Title"
import React from "react"
import csvFile from "../../../assets/files/schema-ROCHE.csv"
import tuto_1 from "../../../assets/img/anonymization/tuto-1.png"
import tuto_12 from "../../../assets/img/anonymization/tuto-12.png"
import tuto_13 from "../../../assets/img/anonymization/tuto-13.png"
import tuto_14 from "../../../assets/img/anonymization/tuto-14.png"
import tuto_15 from "../../../assets/img/anonymization/tuto-15.png"
import tuto_2 from "../../../assets/img/anonymization/tuto-2.png"
import tuto_3 from "../../../assets/img/anonymization/tuto-3.png"
import tuto_4 from "../../../assets/img/anonymization/tuto-4.png"
import tuto_5 from "../../../assets/img/anonymization/tuto-5.png"
import tuto_6 from "../../../assets/img/anonymization/tuto-6.png"
import tuto_7 from "../../../assets/img/anonymization/tuto-7.png"
import tuto_8 from "../../../assets/img/anonymization/tuto-8.png"
import BackArrow from "../../../stories/cosmian/BackArrow/BackArrow"
import "./help-page.less"
const { Text, Link } = Typography

const jsonPre = `{
  "computation_id": "ba5f2fe9-f398-43db-95cb-be7c70ba7a83",
  "name": "Patient data 2020-2021",
  "description": "Data from january 2020 to december 2021",
  "creation_date": "Thu, 10 Feb 2022 09:55:52 GMT",
  "dataset_schema": [
    {
      "column": 1,
      "treatment_type": "Hash",
      "treatment_options": { "hash_function": "SHA256", "salt": "17d587b9-1b27-4e41-9261-98f2ecf6a66f" }
    },
    {
      "column": 2,
      "treatment_type": "AddNoise",
      "treatment_options": { "noise_type": "Gaussian", "standard_deviation": 10, "precision_type": "Year" }
    },
    { "column": 4, "treatment_type": "AddNoise", "treatment_options": { "noise_type": "Gaussian", "standard_deviation": 50 } },
    { "column": 7, "treatment_type": "BlockWords", "treatment_options": { "block_type": "Tokenize", "word_list": ["Kadcyla"] } }
  ]
}`

const HelpPage = (): JSX.Element => {
  return (
    <div className="help-page" style={{ padding: 30, maxWidth: 1440, margin: "0 auto" }}>
      <BackArrow text="Back" url={-1} style={{ paddingLeft: 0 }} />
      <div className="help-box">
        <Title level={1}>How to use Cosmian anonymization tool</Title>
        <Title level={2} id="step1">
          1. Create anonymization configuration
        </Title>
        <p>
          – Click on <span className="strong">Create new anonymization</span> button
          <br />
          <img src={tuto_1} alt="tuto-1" loading="lazy" />
        </p>
        <p>– Give a name (1)</p>
        <p>– Give a description (2) (optional step)</p>
        <p>
          <img src={tuto_2} alt="tuto-2" loading="lazy" />
        </p>
        <p>– Upload your schema file (or use the drag and drop tool)</p>
        <p>
          <img src={tuto_3} alt="tuto-3" loading="lazy" />
        </p>
        <p>
          – Click on <span className="strong">Create anonymization</span> button
        </p>
        <p>
          <img src={tuto_4} alt="tuto-4" loading="lazy" />
        </p>
        <Title level={3}>Schema file</Title>
        <p>– Your schema file must be a CSV file with .csv extention.</p>
        <p>– It must contains a header.</p>
        <p>
          – It must have 3 columns: <span className="strong">column_name</span>, <span className="strong">type</span> and{" "}
          <span className="strong">example_value</span>.
        </p>
        <p>– Columns can be separated with comma or semi-colon.</p>
        <p>
          – The types can be: <Text code>integer</Text> <Text code>float</Text> <Text code>text</Text> <Text code>date</Text>
        </p>
        <p>
          Download our{" "}
          <a href={csvFile} target="_blank" rel="noreferrer">
            example file
          </a>{" "}
          or see the structure below:
        </p>
        <table>
          <tr>
            <th>column_name</th>
            <th>type</th>
            <th>example</th>
          </tr>
          <tr>
            <td>Site ID</td>
            <td>integer</td>
            <td>19484340</td>
          </tr>
          <tr>
            <td>Patient Id</td>
            <td>integer</td>
            <td>202193</td>
          </tr>
          <tr>
            <td>Birth date</td>
            <td>date</td>
            <td>10 Jan 1960</td>
          </tr>
          <tr>
            <td>Weight (kg)</td>
            <td>float</td>
            <td>60.5</td>
          </tr>
          <tr>
            <td>Height (cm)</td>
            <td>integer</td>
            <td>163</td>
          </tr>
          <tr>
            <td>Absence of residues</td>
            <td>integer</td>
            <td>2</td>
          </tr>
          <tr>
            <td>Classification Chevallier</td>
            <td>integer</td>
            <td>3</td>
          </tr>
          <tr>
            <td>Other type of care consumption</td>
            <td>text</td>
            <td>Le patient a reçu du Kadcyla</td>
          </tr>
        </table>
        <Title level={2} id="step2">
          2. Configure anonymization treatments
        </Title>
        <p>– Click on the select icon in treatment column and select the desired treatment.</p>
        <p>
          <img src={tuto_5} alt="tuto-5" loading="lazy" />
        </p>
        <p>
          – In the option pannel, you have acces to parameters to optimize the treatment. Click on the information link to learn more about
          selected treatment.
        </p>
        <p>
          <img src={tuto_7} alt="tuto-7" loading="lazy" />
          <img src={tuto_8} alt="tuto-8" loading="lazy" />
        </p>
        <p>
          – Select the treatment parameters (1). You can see the treatment effect in Outputs &gt; After (2). Once your happy with the
          setting, click on <span className="strong">save</span> button (3).
        </p>
        <p>
          <img src={tuto_6} alt="tuto-6" loading="lazy" />
        </p>
        <p>– Then repeat the operation on each columns.</p>
        <Title level={2}>3. Download configuration file</Title>
        <p>
          Once every column are set, click on <span className="strong">Dowload configuration file</span>. This will download a json
          configuration file on your computer.
        </p>
        <img src={tuto_12} alt="tuto-12" loading="lazy" />
        <p>See example file below:</p>
        <pre>{jsonPre}</pre>
        <hr style={{ marginTop: "3em" }} />
        <Title level={2}>Import configuration file</Title>
        <p>You can import a previously exported JSON configuration file as a new anonymization:</p>
        <p>
          – On anonymization list page, click on <span className="strong">Import configuration file</span> button.
        </p>
        <img src={tuto_13} alt="tuto-13" loading="lazy" />
        <p>– Upload your .json file (or use the drag and drop tool).</p>
        <img src={tuto_14} alt="tuto-14" loading="lazy" />
        <img src={tuto_15} alt="tuto-15" loading="lazy" />
        <p>
          – Click on <span className="strong">Create anonymization</span> button and follow{" "}
          <Link href="#step2">Configure anonymization treatments</Link>. <br />
          If an anonymization with same ID exists, it will be replace with this new configuration file.
        </p>
      </div>
    </div>
  )
}

export default HelpPage
