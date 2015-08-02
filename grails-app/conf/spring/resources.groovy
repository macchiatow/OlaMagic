import com.olamagic.marshaller.CallMarshaller
import com.olamagic.marshaller.NumberMarshaller
import com.olamagic.marshaller.SiteMarshaller
import com.olamagic.marshaller.UserMarshaller
import com.olamagic.marshaller.WorkspaceMarshaller
import com.olamagic.util.ObjectMarshallers

// Place your Spring DSL code here
beans = {

    customObjectMarshallers( ObjectMarshallers ) {

        marshallers = [
                new WorkspaceMarshaller(),
                new UserMarshaller(),
                new SiteMarshaller(),
                new NumberMarshaller(),
                new CallMarshaller()
        ]

    }
}
