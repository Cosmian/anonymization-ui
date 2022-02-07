# How to use Cosmian anonymization tool

## 1. Create anonymization config

- Click on **Create new anonymization** button
  <br />
  <img src="https://raw.githubusercontent.com/Cosmian/Files/main/anonymization_images/tuto-1.png" alt="tuto-1" loading="lazy" />
- Give a name (1)
- Give a description (2) (even if it's optional)
  <br />
  <img src="https://raw.githubusercontent.com/Cosmian/Files/main/anonymization_images/tuto-2.png" alt="tuto-2" loading="lazy" />
- Upload your schema file (or use the drag and drop tool)
  <br />
  <img src="https://raw.githubusercontent.com/Cosmian/Files/main/anonymization_images/tuto-3.png" alt="tuto-3" loading="lazy" />
- Click on **Create anonymization** button
  <br />
  <img src="https://raw.githubusercontent.com/Cosmian/Files/main/anonymization_images/tuto-4.png" alt="tuto-4" loading="lazy" />

### Schema file

Your schema file must be a CSV file with .csv extention.
It must contains a header
It must have 3 columns: **column_name**, **type** and **example**.
Columns can be separated with comma or semi-colon.

The types can be

- integer
- float
- text
- date

Download our <a>example file</a> or see the structure below:

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

## 2. Configure anonymization treatments

- Click on the select icon in treatment column and select the desired treatment.
  <br />
  <img src="https://raw.githubusercontent.com/Cosmian/Files/main/anonymization_images/tuto-5.png" alt="tuto-5" loading="lazy" />
- In the option pannel, you have acces to parameters to optimize the treatment. Click on the information link to learn more about selected treatment.
  <br />
  <img src="https://raw.githubusercontent.com/Cosmian/Files/main/anonymization_images/tuto-7.png" alt="tuto-7" loading="lazy" />
  <br />
  <img src="https://raw.githubusercontent.com/Cosmian/Files/main/anonymization_images/tuto-8.png" alt="tuto-8" loading="lazy" />
- Select the treatment parameters (1). You can see the treatment effect in Outputs > After (2). Once your happy with the setting, click on **save** button (3).
  <br />
  <img src="https://raw.githubusercontent.com/Cosmian/Files/main/anonymization_images/tuto-6.png" alt="tuto-6" loading="lazy" />
- Then repeat the operation on each columns.

## 3. Download config file

Once every column are set, click on **Dowload configuration file**. This will download a json config file on your computer.
<img src="https://raw.githubusercontent.com/Cosmian/Files/main/anonymization_images/tuto-12.png" alt="tuto-12" loading="lazy" />
<br />
See example file below:

```json
{
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
}
```
