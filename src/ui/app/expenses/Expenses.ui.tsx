import { useDarkMode } from '@core/hooks/logic/use-dark-mode'
import { useGetAllExpenses, useGetExpensesAnalytics } from '@core/hooks/query/use-get-expenses'
import { s } from '@core/utils/scale'
import { AppLayout } from '@ui/shared/layouts/app-layout'
import { LoaderLayout } from '@ui/shared/layouts/loader-layout'
import { Plus } from 'lucide-react-native'
import { useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { DashboardGridSkeleton } from './components/dashboard-grid-skeleton'
import { DashbordGrid } from './components/dashbord-grid'
import { ExpenseCardItem } from './components/expense-card'
import { ExpenseListSkeleton } from './components/expense-list-skeleton'
import { Header } from './components/expenses-header'
import { RecordExpenseSheet } from './components/record-expense-action-sheet'

const ExpensesUi = () => {

  const { queryData, expenses, handleLoadMore } = useGetAllExpenses()

  const { queryData: analyticQueryDat, analytic } = useGetExpensesAnalytics()
  const { isDark } = useDarkMode()
    const screenBackgroundColor = isDark ? '#1f2937f7' : '#F7F5FF';

  return (
    <AppLayout
      scrollable={false}
      bgBarStyle={screenBackgroundColor}
      statusBarStyle={isDark ? 'light-content' : 'dark-content'}
    >
      <Header />
      <View style={{
        flex: 1,
        paddingHorizontal: s(16),
        paddingTop: s(20),
      }} className='primary-bg'>

        <LoaderLayout
          isEmptyList={Boolean(expenses?.length === 0)}
          enableDragRefresh={true}
          list={expenses}
          isFlatList={true}
          isRefreshing={queryData.isFetching}
          loaderComponent={<Loader />}
          emptyListMessage="No Transactions Found"
          queryData={queryData}
          renderListItem={({ item }) => <ExpenseCardItem key={item.id} expense={item} />}
          ListHeaderComponent={<DashbordGrid analytic={analytic} />}
          handleLoadMore={handleLoadMore}
        />
      </View>

      <FloatingBtn />

    </AppLayout>
  )
}

const FloatingBtn = () => {
  const [open, setOpen] = useState(false)

  return (
    <>

      < TouchableOpacity
        onPress={() => setOpen(true)}
        className='bg-primary-0'
        style={
          [
            styles.fab,
            {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }
          ]}
        activeOpacity={0.8}
      >
        <Plus size={s(24)} color="#FFFFFF" strokeWidth={2.5} />
      </TouchableOpacity >

      <RecordExpenseSheet open={open} setOpen={setOpen} onClose={() => setOpen(false)} />

    </>

  )
}


const Loader = () => {
  return (
    <View style={{
      flex: 1,
    }}>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: s(16),
          paddingTop: s(20),
          paddingBottom: s(100),
        }}
        showsVerticalScrollIndicator={false}
      >
        <DashboardGridSkeleton count={4} />
        <ExpenseListSkeleton count={4} />;
      </ScrollView>



    </View>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: s(20),
    bottom: s(100),
    width: s(56),
    height: s(56),
    borderRadius: s(28),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
})

export default ExpensesUi
