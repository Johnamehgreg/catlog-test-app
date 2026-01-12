import { Divider } from "@/components/ui/divider"
import { HStack } from "@/components/ui/hstack"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { useDarkMode } from "@core/hooks/logic/use-dark-mode"
import { interBoldFontFamily, interMediumFontFamily, interRegularFontFamily, textStyles } from "@core/styles/text-style"
import { color, formatNumberThousand, resColor } from "@core/utils/helpers"
import { s } from "@core/utils/scale"
import { ExpenseModel } from "@core/utils/types"
import { AvatarCard } from "@ui/shared/cards/avatar-card"
import { MoreHorizontal } from "lucide-react-native"
import React from "react"
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"

export const ExpenseCardItem: React.FC<{ expense: ExpenseModel }> = ({ expense }) => {
    const { isDark } = useDarkMode()
    return (
        <>
            <View
                className="app-border app-card "
                style={[
                    styles.card,
                ]}
            >
                <HStack className="justify-between items-start">
                    <HStack style={{ gap: s(12) }} className="flex-1 items-center">
                        <View
                            style={[
                                styles.receiptIconContainer,

                            ]}
                            className="justify-center items-center p-4 bg-[#F8F8F8] dark:bg-[#1f2937f7] rounded-lg"
                        >
                            <Image source={require('@assets/pngs/receipt.png')} style={{ width: s(20), height: s(20) }} />
                        </View>

                        <VStack style={{ flex: 1, gap: s(4) }}>
                            <Text
                                className="default-text"
                                style={[
                                    textStyles.textBase,
                                    {
                                        fontFamily: interRegularFontFamily,
                                    }
                                ]}
                                numberOfLines={1}
                            >
                                {expense?.description}
                            </Text>
                            <Text
                                className="default-text"
                                style={[
                                    textStyles.textBase,
                                    {
                                        fontFamily: interMediumFontFamily,
                                    }
                                ]}
                            >
                                {formatNumberThousand((expense?.amount || 0)?.toString())}
                            </Text>
                        </VStack>
                    </HStack>

                    <TouchableOpacity style={{ padding: s(5), backgroundColor:isDark ? '#1f2937f7' : '#F8F8F8', borderRadius: s(20) }}>
                        <MoreHorizontal size={s(20)} color={isDark ? '#9CA3AF' : '#707070'} strokeWidth={2} />
                    </TouchableOpacity>
                </HStack>


                <Divider style={{
                    marginVertical: s(10)
                }} className="!bg-[#E5E5E5]" />
                <HStack

                    className="justify-between items-center"
                >
                    <HStack style={{ gap: s(8) }} className="items-center line-clamp-1">

                        <AvatarCard size={'smd'} className="rounded-full" style={{
                            borderRadius: 100,
                            backgroundColor: resColor

                        }} name={expense?.recipient?.name} />


                        <Text
                            className="default-text font-medium capitalize"
                            style={[
                                textStyles.textBase,
                                {
                                    fontFamily: interBoldFontFamily,
                                }

                            ]}
                        >
                            {expense?.recipient?.name}
                        </Text>
                    </HStack >
                    <View
                        className="bg-background-gray1 rounded-full"
                        style={[
                            styles.tag,
                        ]}
                    >
                        <Text
                            className="default-text !font-semibold"
                            style={[
                                textStyles.textXs,
                                {
                                    color: color,
                                    fontFamily: interMediumFontFamily,
                                }
                            ]}
                        >
                            {/* {expense.tag.text} */}
                            SOFTWARE
                        </Text>
                    </View>
                </HStack >
            </View >
        </>

    );
};



const styles = StyleSheet.create({
    card: {
        borderRadius: s(12),
        padding: s(16),
        marginBottom: s(12),
    },
    topRow: {
        marginBottom: s(12),
    },
    receiptIconContainer: {
        width: s(40),
        height: s(40),
        borderRadius: s(8),

        marginTop: s(2),
    },
    bottomRow: {
        paddingTop: s(12),
        borderTopWidth: 1,
    },
    avatarContainer: {
        width: s(32),
        height: s(32),
        borderRadius: s(16),

    },
    tag: {
        paddingHorizontal: s(8),
        paddingVertical: s(4),
    },
});