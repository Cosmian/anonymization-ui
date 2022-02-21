import { Drawer } from "antd"
import React, { FC, useEffect, useState } from "react"
import ActiveOptions from "../../../../assets/img/illustrations/active-options.svg"
import { Treatment } from "../../../../redux/reducers/ciphercompute/anonymization/types"
import "./anonymization-drawer.less"

type AnonymizationDrawerProps = {
  visible: boolean
  treatment: Treatment | undefined
  closeDrawer: () => void
}

const AnonymizationDrawer: FC<AnonymizationDrawerProps> = ({ visible, treatment, closeDrawer }) => {
  const [drawerVisible, setDrawerVisible] = useState(false)

  useEffect(() => {
    setDrawerVisible(visible)
  }, [visible])

  return (
    <Drawer placement="right" width={380} onClose={closeDrawer} visible={drawerVisible} className="anonym-drawer">
      <img src={ActiveOptions} />
      {(() => {
        switch (treatment) {
          case Treatment.Hash:
            return (
              <>
                <h3>Hash function</h3>
                <p>
                  This corresponds to a function which returns a fixed size output from an input of any size (the input may be a single
                  attribute or a set of attributes) and cannot be reversed; this means that the reversal risk seen with encryption no longer
                  exists. However, if the range of input values the hash function are known they can be replayed through the hash function
                  in order to derive the correct value for a particular record.
                </p>
                <p className="strong title">Example</p>
                <p>
                  For instance, if a dataset was pseudonymised by hashing the national identification number, then this can be derived
                  simply by hashing all possible input values and comparing the result with those values in the dataset. Hash functions are
                  usually designed to be relatively fast to compute, and are subject to brute force attacks. Pre-computed tables can also be
                  created to allow for the bulk reversal of a large set of hash values.
                </p>
              </>
            )
          case Treatment.Aggregate:
            return (
              <>
                <h3>Aggregation and K-anonymity</h3>
                <p>
                  Aggregation and K-anonymity techniques aim to prevent a data subject from being singled out by grouping them with, at
                  least, k other individuals. To achieve this, the attribute values are generalized to an extent such that each individual
                  shares the same value.
                </p>
                <p className="strong title">Example</p>
                <p>
                  For example, by lowering the granularity of a location from a city to a country a higher number of data subjects are
                  included. Individual dates of birth can be generalized into a range of dates, or grouped by month or year. Other numerical
                  attributes (e.g. salaries, weight, height, or the dose of a medicine) can be generalized by interval values (e.g. salary
                  €20,000 – €30,000). These methods may be used when the correlation of punctual values of attributes may create
                  quasi-identifiers.
                </p>
              </>
            )
          case Treatment.AddNoise:
            return (
              <>
                <h3>Noise addition</h3>
                <p>
                  The technique of noise addition is especially useful when attributes may have an important adverse effect on individuals
                  and consists of modifying attributes in the dataset such that they are less accurate whilst retaining the overall
                  distribution. When processing a dataset, an observer will assume that values are accurate but this will only be true to a
                  certain degree.
                </p>
                <p className="strong title">Example</p>
                <p>
                  As an example, if an individual’s height was originally measured to the nearest centimetre the anonymised dataset may
                  contain a height accurate to only +-10cm. If this technique is applied effectively, a third-party will not be able to
                  identify an individual nor should he be able to repair the data or otherwise detect how the data have been modified. Noise
                  addition will commonly need to be combined with other anonymization techniques such as the removal of obvious attributes
                  and quasi-identifiers. The level of noise should depend on the necessity of the level of information required and the
                  impact on individuals’ privacy as a result of disclosure of the protected attributes.
                </p>
              </>
            )
          case Treatment.BlockWords:
            return (
              <>
                <h3>Block words</h3>
                <p>
                  The technique of noise addition is especially useful when attributes may have an important adverse effect on individuals
                  and consists of modifying attributes in the dataset such that they are less accurate whilst retaining the overall
                  distribution. When processing a dataset, an observer will assume that values are accurate but this will only be true to a
                  certain degree.
                </p>
                <p className="strong title">Example</p>
                <p>
                  As an example, if an individual’s height was originally measured to the nearest centimetre the anonymised dataset may
                  contain a height accurate to only +-10cm. If this technique is applied effectively, a third-party will not be able to
                  identify an individual nor should he be able to repair the data or otherwise detect how the data have been modified. Noise
                  addition will commonly need to be combined with other anonymization techniques such as the removal of obvious attributes
                  and quasi-identifiers. The level of noise should depend on the necessity of the level of information required and the
                  impact on individuals’ privacy as a result of disclosure of the protected attributes.
                </p>
              </>
            )
        }
      })()}
    </Drawer>
  )
}

export default AnonymizationDrawer
