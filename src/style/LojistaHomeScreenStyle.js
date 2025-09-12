import { StyleSheet } from 'react-native';

const stylesLojistaHome = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        width: '100%',
    },
    header: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingBottom: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        width: '100%',
    },
    backButton: {
        paddingVertical: 6,
        paddingRight: 8,
        
    },
    backText: {
        color: '#333',
        fontSize: 16,
        width: '100%',
    },
    content: {
        padding: 16,
        width: '100%',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
        width: '100%',
    },
    createRow: {
        alignItems: 'flex-end',
        marginBottom: 8,
        width: '100%',
    },
    smallPrimaryButton: {
        backgroundColor: '#eb8b47',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 10,
        width: '100%',
    },
    smallPrimaryButtonText: {  
        color: '#000', 
        fontWeight: '700',
        width: '100%',
        textAlign: 'center',
    },
    raffleRow: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#ffffff', 
        borderRadius: 12, 
        borderWidth: 1, 
        borderColor: '#eee', 
        padding: 12, marginBottom: 10,
        width: '100%',
    },
    raffleStatus: { 
        color: '#6b5f57', 
        fontSize: 12, 
        marginBottom: 2,
        width: '100%',
    },
    raffleTitle: { 
        fontWeight: '700', fontSize: 15, color: '#000',
        width: '100%',
    },
    actionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 8,
        flexWrap: 'wrap',
        flexShrink: 0,
    },
    listButton: { 
        backgroundColor: '#f2efed', 
        paddingVertical: 8, 
        paddingHorizontal: 12, 
        borderRadius: 8,
    },
    listButtonText: { 
        color: '#000', 
        fontWeight: '600',
        textAlign: 'center',
    },
    downloadButton: { 
        backgroundColor: '#eb8b47', 
        paddingVertical: 8, 
        paddingHorizontal: 12, borderRadius: 8,
    },
});

export default stylesLojistaHome;