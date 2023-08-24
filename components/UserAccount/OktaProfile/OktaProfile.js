import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import { styled, unstable_styleFunctionSx } from '@mui/system'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'

const StyledCountryDropdown = styled(CountryDropdown)(unstable_styleFunctionSx)
const StyledRegionDropdown = styled(RegionDropdown)(unstable_styleFunctionSx)

export default function OktaProfile({ userId, profile }) {
  const [updateSuccess, setUpdateSuccess] = useState(false)

  const [firstName, setFirstName] = useState(profile?.firstName)
  const [lastName, setLastName] = useState(profile?.lastName)
  const [email, setEmail] = useState(profile?.email)

  const [role, setRole] = useState(profile?.role)
  const [department, setDepartment] = useState(profile?.department)
  const [districtName, setDistrictName] = useState(profile?.districtName)
  const [title, setTitle] = useState(profile?.title)
  const [streetAddress, setStreetAddress] = useState(profile?.streetAddress)
  const [postalAddress, setPostalAddress] = useState(profile?.postalAddress)
  const [city, setCity] = useState(profile?.city)
  const [state, setState] = useState(profile?.state)
  const [zipCode, setZipCode] = useState(profile?.zipCode)
  const [countryCode, setCountryCode] = useState(profile?.countryCode)

  const [changePassword, setChangePassword] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
    if (value !== password) {
      return false
    }
    return true
  })

  const saveProfile = async () => {
    setUpdateSuccess(false)

    const userObj = {
      profile: {
        email: email,
        login: email,
        firstName: firstName,
        lastName: lastName,
        role: role,
        department: department,
        districtName: districtName,
        title: title,
        streetAddress: streetAddress,
        postalAddress: postalAddress,
        city: city,
        state: state,
        zipCode: zipCode,
        countryCode: countryCode,
      },
    }
    if (changePassword) {
      userObj.credentials = { password: { value: password } }
    }

    const res = await fetch(`/api/okta/update-user`, {
      method: 'POST',
      body: JSON.stringify({
        userId: userId,
        userObj: userObj,
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (res?.status === 200) {
      setUpdateSuccess(true)
    }
  }
  return (
    <Box>
      <Box>
        <Box p={4}>
          <Box>
            <ValidatorForm onSubmit={saveProfile}>
              <TextValidator
                id='firstName'
                label='First Name'
                variant='outlined'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                InputLabelProps={{
                  sx: {
                    color: 'grey.medium',
                  },
                }}
                sx={{
                  marginBottom: '30px',
                }}
                required
                validators={[
                  'minStringLength:2',
                  'maxStringLength:128',
                  'matchRegexp:^[-a-zA-Z]+(\\s+[-a-zA-Z]+)*$',
                ]}
                errorMessages={['input is not valid']}
              />

              <TextValidator
                id='lastName'
                label='Last Name'
                variant='outlined'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
                InputLabelProps={{
                  sx: {
                    color: 'grey.medium',
                  },
                }}
                sx={{
                  marginBottom: '30px',
                }}
                required
                validators={[
                  'minStringLength:2',
                  'maxStringLength:128',
                  'matchRegexp:^[-a-zA-Z]+(\\s+[-a-zA-Z]+)*$',
                ]}
                errorMessages={['input is not valid']}
              />

              <TextValidator
                id='email'
                type='email'
                label='Email'
                variant='outlined'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                InputLabelProps={{
                  sx: {
                    color: 'grey.medium',
                  },
                }}
                sx={{
                  marginBottom: '30px',
                }}
                required
                validators={['isEmail']}
                errorMessages={['input is not valid']}
              />

              <FormControl
                fullWidth
                sx={{
                  marginBottom: '30px',
                }}
              >
                <InputLabel id='role-label' sx={{ color: 'grey.medium' }}>
                  Role
                </InputLabel>
                <Select
                  id='role'
                  labelId='role-label'
                  label='Role'
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  fullWidth
                  disableUnderline
                >
                  <MenuItem value='Teacher'>Teacher</MenuItem>
                  <MenuItem value='School Leader'>School Leader</MenuItem>
                  <MenuItem value='District Administrator'>
                    District Administrator
                  </MenuItem>
                  <MenuItem value='Professor/University Staff'>
                    Professor/University Staff
                  </MenuItem>
                  <MenuItem value='Aspiring Educator'>
                    Aspiring Educator
                  </MenuItem>
                  <MenuItem value='Other'>Other</MenuItem>
                </Select>
              </FormControl>

              <TextValidator
                id='title'
                label='Title'
                variant='outlined'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                InputLabelProps={{
                  sx: {
                    color: 'grey.medium',
                  },
                }}
                sx={{
                  marginBottom: '30px',
                }}
                validators={['matchRegexp:^[-a-zA-Z]+(\\s+[-a-zA-Z]+)*$']}
                errorMessages={['input is not valid']}
              />

              <TextValidator
                id='district'
                label='School District/Organization'
                variant='outlined'
                value={districtName}
                onChange={(e) => setDistrictName(e.target.value)}
                fullWidth
                InputLabelProps={{
                  sx: {
                    color: 'grey.medium',
                  },
                }}
                sx={{
                  marginBottom: '30px',
                }}
                required
                validators={[
                  'minStringLength:2',
                  'maxStringLength:128',
                  'matchRegexp:^[-a-zA-Z0-9]+(\\s+[-a-zA-Z0-9]+)*$',
                ]}
                errorMessages={['input is not valid']}
              />

              <TextValidator
                id='department'
                label='Department'
                variant='outlined'
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                sx={{
                  marginBottom: '30px',
                }}
                InputLabelProps={{
                  sx: {
                    color: 'grey.medium',
                  },
                }}
                fullWidth
                validators={['matchRegexp:^[-a-zA-Z]+(\\s+[-a-zA-Z]+)*$']}
                errorMessages={['input is not valid']}
              />

              <TextValidator
                id='street1'
                label='Street address'
                variant='outlined'
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                sx={{
                  marginBottom: '30px',
                }}
                InputLabelProps={{
                  sx: {
                    color: 'grey.medium',
                  },
                }}
                fullWidth
                required
                validators={[
                  'matchRegexp:^[-a-zA-Z0-9-()]+(\\s+[-a-zA-Z0-9-()]+)*$',
                ]}
                errorMessages={['input is not valid']}
              />

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  justifyContent: 'space-between',
                  gap: '30px',
                  marginBottom: '30px',
                }}
              >
                <Box
                  sx={{
                    width: { xs: '100%', md: '25%' },
                  }}
                >
                  <TextValidator
                    id='street2'
                    label='Apt/Suite'
                    variant='outlined'
                    value={postalAddress}
                    onChange={(e) => setPostalAddress(e.target.value)}
                    InputLabelProps={{
                      sx: {
                        color: 'grey.medium',
                      },
                    }}
                    validators={[
                      'matchRegexp:^[-a-zA-Z0-9-()]+(\\s+[-a-zA-Z0-9-()]+)*$',
                    ]}
                    errorMessages={['input is not valid']}
                  />
                </Box>

                <Box
                  sx={{
                    width: { xs: '100%', md: '75%' },
                  }}
                >
                  <TextValidator
                    id='city'
                    label='City'
                    variant='outlined'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    fullWidth
                    InputLabelProps={{
                      sx: {
                        color: 'grey.medium',
                      },
                    }}
                    required
                    validators={[
                      'matchRegexp:^[-a-zA-Z0-9-()]+(\\s+[-a-zA-Z0-9-()]+)*$',
                    ]}
                    errorMessages={['City is not valid']}
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  justifyContent: 'space-between',
                  gap: '30px',
                  marginBottom: '30px',
                }}
              >
                <StyledCountryDropdown
                  id='country'
                  value={countryCode}
                  valueType='short'
                  onChange={(val) => setCountryCode(val)}
                  required
                  sx={{
                    font: 'inherit',
                    width: { xs: '100%', md: '40%' },
                    padding: '14.5px 14px',
                    borderRadius: '4px',
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                  }}
                />

                <TextValidator
                  id='zip'
                  label='Postal/ZIP code'
                  variant='outlined'
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  InputLabelProps={{
                    width: { xs: '100%', md: '20%' },
                    sx: {
                      color: 'grey.medium',
                    },
                  }}
                  required
                  validators={[
                    countryCode === 'US'
                      ? 'matchRegexp:(^[0-9]{5}$)|(^[0-9]{5}-[0-9]{4}$)'
                      : 'matchRegexp:^[-a-zA-Z0-9-()]+(\\s+[-a-zA-Z0-9-()]+)*$',
                  ]}
                  errorMessages={['Zipcode is not valid']}
                />

                <StyledRegionDropdown
                  id='state'
                  country={countryCode}
                  countryValueType='short'
                  value={state}
                  valueType='short'
                  onChange={(val) => setState(val)}
                  required
                  sx={{
                    font: 'inherit',
                    width: { xs: '100%', md: '40%' },
                    padding: '14.5px 14px',
                    borderRadius: '4px',
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                  }}
                />
              </Box>

              <Box sx={{ marginBottom: '30px' }}>
                {!changePassword && (
                  <Button
                    onClick={() => setChangePassword(true)}
                    sx={{
                      background: 'none',
                      '&:hover': {
                        background: 'none',
                        color: 'hover.main',
                      },
                      padding: '0',
                    }}
                    variant='text'
                  >
                    Change Password
                  </Button>
                )}

                {changePassword && (
                  <>
                    <TextValidator
                      id='password'
                      name='password'
                      type='password'
                      label='Password'
                      variant='outlined'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      fullWidth
                      InputLabelProps={{
                        sx: {
                          color: 'grey.medium',
                        },
                      }}
                      sx={{
                        marginBottom: '30px',
                      }}
                      required
                      validators={['required']}
                      errorMessages={['input is not valid']}
                    />

                    <TextValidator
                      id='confirmPassword'
                      type='password'
                      label='Confirm Password'
                      variant='outlined'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      fullWidth
                      InputLabelProps={{
                        sx: {
                          color: 'grey.medium',
                        },
                      }}
                      required
                      validators={['isPasswordMatch', 'required']}
                      errorMessages={['input is not valid']}
                    />
                  </>
                )}

                {changePassword && (
                  <Button
                    onClick={() => setChangePassword(false)}
                    sx={{
                      background: 'none',
                      '&:hover': {
                        background: 'none',
                        color: 'hover.main',
                      },
                      padding: '0',
                    }}
                    variant='text'
                  >
                    Cancel Password Change
                  </Button>
                )}
              </Box>

              <Button
                type='submit'
                color='primary'
                variant='contained'
                fullWidth
              >
                Save Changes
              </Button>

              {updateSuccess && (
                <Typography variant='body2' my={1}>
                  Your profile has been updated successfully
                </Typography>
              )}
            </ValidatorForm>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
