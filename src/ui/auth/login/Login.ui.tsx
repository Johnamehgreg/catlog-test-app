import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { useDarkMode } from '@core/hooks/logic/use-dark-mode';
import { useLogin } from '@core/hooks/logic/use-login';
import { globalStyles } from '@core/styles/global-style';
import { boldFontFamily, mediumFontFamily, textStyles } from '@core/styles/text-style';
import { s } from '@core/utils/scale';
import { AppBtn } from '@ui/shared/buttons/app-btn';
import AppInput from '@ui/shared/inputs/app-input';
import { AppLayout } from '@ui/shared/layouts/app-layout';
import AppTab from '@ui/shared/others/app-tab';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';



const LoginUi = () => {

  const { isDark } = useDarkMode()

  const { handleTabChange, activeTab, tabList, formik, isPending } = useLogin()
    const screenBackgroundColor = isDark ? '#1f2937f7' : '#F7F5FF';


  return (
    <AppLayout
      statusBarStyle={isDark ? 'light-content' : 'dark-content'}
bgBarStyle={screenBackgroundColor}
    >
      <VStack style={[
        globalStyles?.appHorizontalPadding, {
          paddingTop: s(60),
          paddingBottom: s(40),
        }
      ]} className='justify-center items-center secondary-bg '>

        <Image source={require('@assets/pngs/login.png')} style={{ width: s(120), height: s(120) }} />
        <Text
          className='default-text'
          style={[textStyles.textXl, { fontFamily: mediumFontFamily, marginTop: s(10) }]}>
          Welcome back,

        </Text>
        <Text
          className='primary-text'
          style={[textStyles.text2Xl, { fontFamily: boldFontFamily, }]}>
          Login to your account
        </Text>

      </VStack>

      <VStack className='flex-1 primary-bg' style={[globalStyles.appHorizontalPadding, {
        paddingTop: s(20),
        paddingBottom: s(30),
      }]}>

        <AppTab
          variant='primary'
          tabs={tabList}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        <VStack style={{
          gap: s(15),
          marginTop: s(30)
        }}>
          {activeTab === 'Email' ? (
            <AppInput
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              errorMessage={formik.errors.email}
              value={formik.values.email}
              placeholder="Email Address"
              touched={formik.touched.email}
              keyboardType="email-address"
            />
          ) : (
            <AppInput
              onChangeText={formik.handleChange('phone')}
              onBlur={formik.handleBlur('phone')}
              errorMessage={formik.errors.phone}
              value={formik.values.phone}
              placeholder="Phone Number"
              touched={formik.touched.phone}
              keyboardType="phone-pad"
            />
          )}

          <AppInput
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            errorMessage={formik.errors.password}
            value={formik.values.password}
            placeholder="Password"
            isSecure={true}
            touched={formik.touched.password}
          />
        </VStack>

        {/* Forgot password - aligned right */}
        <View style={{ alignItems: 'flex-end', marginTop: s(10), marginBottom: s(40) }}>
          <Pressable>
            <Text
              className='primary-text'
              style={[styles.forgotPassword,]}>
              Forgot password?
            </Text>
          </Pressable>
        </View>



        <VStack className='mt-auto' style={{
          gap: s(20),
          paddingBottom: s(20)
        }}>
          {/* Create account text */}
          <HStack style={{
            backgroundColor: (isDark ? "#374151" : "#F8F8F8"), paddingVertical: s(6), paddingHorizontal: s(16), borderRadius: s(40)
          }} className="flex-row gap-2 justify-center items-center !w-fit mx-auto">
            <Text
              style={[textStyles.textSm, { fontFamily: mediumFontFamily }]}
              className="default-text">
              New to Catlog?{' '}
            </Text>
            <Pressable>
              <Text

                style={[textStyles.textSm, { fontFamily: mediumFontFamily }]}
                className="leading-tight primary-text">
                Create an account
              </Text>
            </Pressable>
          </HStack>

          {/* Large purple Login button */}
          <AppBtn
            title="Login"
            onPress={formik.handleSubmit}
            loading={isPending}
            className="w-full"
            btnStyle={{
              height: s(56),
              borderRadius: s(12),
              width: '100%',
            }}
            textStyle={{
              fontSize: s(16),
              fontWeight: '600'
            }}
          />
        </VStack>
      </VStack>
    </AppLayout>
  )
}





const styles = StyleSheet.create({
  forgotPassword: {
    fontSize: s(14),
    fontFamily: 'FHOscarTest-Regular',
  },
})

export default LoginUi