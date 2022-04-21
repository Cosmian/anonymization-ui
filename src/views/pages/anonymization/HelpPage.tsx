import { Typography } from "antd"
import Title from "antd/lib/typography/Title"
import React from "react"
import csvFile from "../../../assets/files/metadata_example.csv"
import tuto_1 from "../../../assets/img/anonymization/tuto-01.png"
import tuto_2 from "../../../assets/img/anonymization/tuto-02.png"
import tuto_3 from "../../../assets/img/anonymization/tuto-03.png"
import tuto_4 from "../../../assets/img/anonymization/tuto-04.png"
import tuto_5 from "../../../assets/img/anonymization/tuto-05.png"
import tuto_6 from "../../../assets/img/anonymization/tuto-06.png"
import tuto_7 from "../../../assets/img/anonymization/tuto-07.png"
import tuto_8 from "../../../assets/img/anonymization/tuto-08.png"
import tuto_9 from "../../../assets/img/anonymization/tuto-09.png"
import tuto_10 from "../../../assets/img/anonymization/tuto-10.png"
import tuto_11 from "../../../assets/img/anonymization/tuto-11.png"
import BackArrow from "../../../stories/cosmian/BackArrow/BackArrow"
import "./help-page.less"
const { Text, Link } = Typography

const jsonPre = `{
  "computation_id": "ba5f2fe9-f398-43db-95cb-be7c70ba7a83",
  "name": "Products",
  "description": "Product list - january 2022",
  "creation_date": "Tue, 01 Mar 2022 14:38:25 GMT",
  "dataset_metadata": [
    {
      "key": 1,
      "technique_type": "Hash",
      "technique_options": { "hash_function": "SHA256", "salt": "17d587b9-1b27-4e41-9261-98f2ecf6a66f" }
    },
    {
      "key": 2,
      "technique_type": "AddNoise",
      "technique_options": { "noise_type": "Gaussian", "standard_deviation": 10, "precision_type": "Year" }
    },
    { "key": 4, "technique_type": "AddNoise", "technique_options": { "noise_type": "Gaussian", "standard_deviation": 50 } },
    { "key": 7, "technique_type": "BlockWords", "technique_options": { "block_type": "Tokenize", "word_list": ["Kadcyla"] } }
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
        <p>– Give a name (1) and a description (2) (optional step)</p>
        <p>
          <img src={tuto_2} alt="tuto-2" loading="lazy" />
        </p>
        <p>
          – Upload your metadata file (or use the drag and drop tool) (1) and click on <span className="strong">Create anonymization</span>{" "}
          button (2)
        </p>
        <p>
          <img src={tuto_3} alt="tuto-3" loading="lazy" />
        </p>
        <Title level={3}>Metadata file</Title>
        <p>– Your metadata file must be a CSV file with .csv extention.</p>
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
          <tbody>
            <tr>
              <th>column_name</th>
              <th>type</th>
              <th>example_value</th>
            </tr>
            <tr>
              <td>Site ID</td>
              <td>integer</td>
              <td>23578901</td>
            </tr>
            <tr>
              <td>Brand ID</td>
              <td>integer</td>
              <td>26419574</td>
            </tr>
            <tr>
              <td>Product ID</td>
              <td>integer</td>
              <td>167836</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>float</td>
              <td>189.25</td>
            </tr>
            <tr>
              <td>Stock</td>
              <td>integer</td>
              <td>200</td>
            </tr>
            <tr>
              <td>Promotion</td>
              <td>float</td>
              <td>18.75</td>
            </tr>
            <tr>
              <td>Product release</td>
              <td>date</td>
              <td>02/16/2022</td>
            </tr>
            <tr>
              <td>Product expiration</td>
              <td>date</td>
              <td>Monday 1 January 2029 00:00:00</td>
            </tr>
            <tr>
              <td>Discount expiration</td>
              <td>date</td>
              <td>Thursday 14 July 2022 00:00:00</td>
            </tr>
            <tr>
              <td>Product name</td>
              <td>text</td>
              <td>Techilog Wireless Keyboard</td>
            </tr>
            <tr>
              <td>Brand</td>
              <td>text</td>
              <td>Techilog</td>
            </tr>
            <tr>
              <td>Tags</td>
              <td>text</td>
              <td>techilog, keyboard, wireless</td>
            </tr>
            <tr>
              <td>Category</td>
              <td>text</td>
              <td>keyboard</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>text</td>
              <td>
                Techilog advanced 2.4 GHz wireless connectivity gives you the reliability of a cord plus wireless convenience and
                freedom—fast data transmission, virtually no delays or dropouts, and wireless encryption.
              </td>
            </tr>
            <tr>
              <td>Comments</td>
              <td>text</td>
              <td>
                Quantity paddle on both Techilog vertical integration work flows. Quarterly sales are at an all-time low rehydrate the team
                exposing new ways to evolve our design language 4-blocker and conversational banana, show pony sorry i was triple muted.
                Pull in ten extra bodies to help roll the tortoise. Copy and paste from stack overflow we don't need to boil the ocean here
                prairie dogging, for waste of resources, or on this journey for incentivize adoption. Tribal knowledge window of
                opportunity.
              </td>
            </tr>
          </tbody>
        </table>
        <Title level={2} id="step2">
          2. Configure anonymization techniques
        </Title>
        <p>– Click on the select icon in technique column and select the desired technique.</p>
        <p>
          <img src={tuto_4} alt="tuto-4" loading="lazy" />
        </p>
        <p>
          – In the option pannel, you have acces to parameters to optimize the technique. Click on the information link to learn more about
          selected technique.
        </p>
        <p>
          <img src={tuto_5} alt="tuto-5" loading="lazy" />
          <img src={tuto_6} alt="tuto-6" loading="lazy" />
        </p>
        <p>
          – Select the technique parameters (1). You can see the technique effect in Outputs &gt; After (2). Once your happy with the
          setting, click on <span className="strong">save</span> button (3).
        </p>
        <p>
          <img src={tuto_7} alt="tuto-7" loading="lazy" />
        </p>
        <p>– Then repeat the operation on each columns.</p>
        <Title level={2}>3. Download configuration file</Title>
        <p>
          Once every column are set, click on <span className="strong">Dowload configuration file</span>. This will download a json
          configuration file on your computer.
        </p>
        <img src={tuto_8} alt="tuto-8" loading="lazy" />
        <p>See example file below:</p>
        <pre>{jsonPre}</pre>
        <hr style={{ marginTop: "3em" }} />
        <Title level={2}>Import configuration file</Title>
        <p>You can import a previously exported JSON configuration file as a new anonymization:</p>
        <p>
          – On anonymization list page, click on <span className="strong">Import configuration file</span> button.
        </p>
        <img src={tuto_9} alt="tuto-9" loading="lazy" />
        <p>– Upload your .json file (or use the drag and drop tool).</p>
        <img src={tuto_10} alt="tuto-10" loading="lazy" />
        <p>
          – Click on <span className="strong">Create anonymization</span> button and follow{" "}
          <Link href="#step2">Configure anonymization techniques</Link>. <br />
          If an anonymization with same ID exists, it will be replace with this new configuration file.
        </p>
        <img src={tuto_11} alt="tuto-11" loading="lazy" />
      </div>
    </div>
  )
}

export default HelpPage
