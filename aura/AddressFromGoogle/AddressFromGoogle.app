<!--
 - Created by schaudhry on 6/24/18.
 -->

<aura:application description="AddressFromGoogle" extends="force:slds">
    <aura:attribute name="address" type="String" />
    <!--<aura:attribute name="apiKey" type="String" />-->
    <c:GoogleAddressComp address="{!v.address}" />
</aura:application>