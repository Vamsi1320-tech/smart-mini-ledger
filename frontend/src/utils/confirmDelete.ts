import Swal from "sweetalert2";

export async function confirmDelete(item: string) {
    const result = await Swal.fire({
        title: `Delete ${item}?`,
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#64748b",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        reverseButtons: true,
        background: "#1e293b",
        color: "#ffffff",
    });

    return result.isConfirmed;
}